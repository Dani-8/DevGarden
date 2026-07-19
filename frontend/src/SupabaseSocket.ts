import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { PlayerState } from './types.js';

export class SupabaseSocket {
  private client: any;
  private channel: RealtimeChannel | null = null;
  private listeners: Record<string, Function[]> = {};
  private selfPlayer: PlayerState;
  private isConnected = false;

  constructor(supabaseUrl: string, supabaseAnonKey: string, selfPlayer: PlayerState) {
    if (supabaseUrl && supabaseAnonKey) {
      this.client = createClient(supabaseUrl, supabaseAnonKey);
    } else {
      console.warn('Supabase URL or Anon Key is missing. SupabaseSocket will run in LOCAL/MOCK fallback mode.');
      this.client = null;
    }
    this.selfPlayer = selfPlayer;
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback?: Function) {
    if (!callback) {
      delete this.listeners[event];
    } else if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  private trigger(event: string, ...args: any[]) {
    const callbacks = this.listeners[event] || [];
    callbacks.forEach(cb => {
      try {
        cb(...args);
      } catch (e) {
        console.error(`Error in socket listener for event "${event}":`, e);
      }
    });
  }

  connect() {
    if (this.channel) return;

    if (!this.client) {
      setTimeout(() => {
        if (!this.isConnected) {
          this.isConnected = true;
          this.trigger('connect');
        }

        const players = [this.selfPlayer];

        const apiBase = import.meta.env.VITE_API_URL || '';
        fetch(`${apiBase}/api/leaderboard`)
          .then(res => res.json())
          .then(topUsers => {
            const activeIds = new Set(players.map(p => p.id));
            const sleepingNPCs = topUsers
              .filter((u: any) => !activeIds.has(u.github_id))
              .slice(0, 4)
              .map((u: any, i: number) => {
                const positions = [
                  { x: 180, y: 150 },
                  { x: 620, y: 150 },
                  { x: 180, y: 450 },
                  { x: 620, y: 450 },
                ];
                const pos = positions[i] || { x: 100 + i * 80, y: 100 };
                return {
                  id: `sleeping_${u.github_id}`,
                  username: u.username,
                  avatar_url: u.avatar_url,
                  level: u.level,
                  score: u.score,
                  title: u.title,
                  visual_tier: u.visual_tier,
                  x: pos.x,
                  y: pos.y,
                  isNPC: true,
                  isSleeping: true,
                  commits: u.commits,
                  stars: u.stars,
                  followers: u.followers,
                  repos: u.repos,
                };
              });

            this.trigger('world_init', {
              self: this.selfPlayer,
              players: players,
              sleepingNPCs: sleepingNPCs,
            });

            this.trigger('sleeping_npcs_update', sleepingNPCs);
          })
          .catch(err => {
            console.error('Error fetching leaderboard for sleeping NPCs (Mock mode):', err);
            this.trigger('world_init', {
              self: this.selfPlayer,
              players: players,
              sleepingNPCs: [],
            });
          });
      }, 300);
      return;
    }

    const channelName = 'room:garden';
    this.channel = this.client.channel(channelName);

    this.channel
      .on('presence', { event: 'sync' }, () => {
        const state = this.channel!.presenceState();
        const players: PlayerState[] = [];

        Object.keys(state).forEach(key => {
          const presences = state[key] as any[];
          if (presences && presences.length > 0) {
            const p = presences[presences.length - 1];
            players.push({
              id: p.id,
              username: p.username,
              avatar_url: p.avatar_url,
              level: Number(p.level ?? 1),
              score: Number(p.score ?? 0),
              title: p.title || 'Sprout',
              visual_tier: p.visual_tier || 'green',
              x: Number(p.x ?? 400),
              y: Number(p.y ?? 300),
              anim: p.anim || 'idle_down',
              commits: p.commits,
              stars: p.stars,
              followers: p.followers,
              repos: p.repos,
            });
          }
        });

        if (!this.isConnected) {
          this.isConnected = true;
          this.trigger('connect');
        }

        fetch('/api/leaderboard')
          .then(res => res.json())
          .then(topUsers => {
            const activeIds = new Set(players.map(p => p.id));
            const sleepingNPCs = topUsers
              .filter((u: any) => !activeIds.has(u.github_id))
              .slice(0, 4)
              .map((u: any, i: number) => {
                const positions = [
                  { x: 180, y: 150 },
                  { x: 620, y: 150 },
                  { x: 180, y: 450 },
                  { x: 620, y: 450 },
                ];
                const pos = positions[i] || { x: 100 + i * 80, y: 100 };
                return {
                  id: `sleeping_${u.github_id}`,
                  username: u.username,
                  avatar_url: u.avatar_url,
                  level: u.level,
                  score: u.score,
                  title: u.title,
                  visual_tier: u.visual_tier,
                  x: pos.x,
                  y: pos.y,
                  isNPC: true,
                  isSleeping: true,
                  commits: u.commits,
                  stars: u.stars,
                  followers: u.followers,
                  repos: u.repos,
                };
              });

            const selfInList = players.find(p => p.id === this.selfPlayer.id) || this.selfPlayer;
            this.trigger('world_init', {
              self: selfInList,
              players: players,
              sleepingNPCs: sleepingNPCs,
            });

            this.trigger('sleeping_npcs_update', sleepingNPCs);
          })
          .catch(err => {
            console.error('Error fetching leaderboard for sleeping NPCs:', err);
            this.trigger('world_init', {
              self: this.selfPlayer,
              players: players,
              sleepingNPCs: [],
            });
          });
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        newPresences.forEach((p: any) => {
          if (p.id !== this.selfPlayer.id) {
            this.trigger('player_joined', {
              id: p.id,
              username: p.username,
              avatar_url: p.avatar_url,
              level: Number(p.level ?? 1),
              score: Number(p.score ?? 0),
              title: p.title || 'Sprout',
              visual_tier: p.visual_tier || 'green',
              x: Number(p.x ?? 400),
              y: Number(p.y ?? 300),
              anim: p.anim || 'idle_down',
              commits: p.commits,
              stars: p.stars,
              followers: p.followers,
              repos: p.repos,
            });
          }
        });
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        leftPresences.forEach((p: any) => {
          this.trigger('player_left', { id: p.id });
        });
      })
      .on('broadcast', { event: 'player_moved' }, ({ payload }) => {
        if (payload.id !== this.selfPlayer.id) {
          this.trigger('player_moved', payload);
        }
      })
      .on('broadcast', { event: 'player_chatted' }, ({ payload }) => {
        this.trigger('player_chatted', payload);
      });

    this.channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await this.channel!.track({
          id: this.selfPlayer.id,
          username: this.selfPlayer.username,
          avatar_url: this.selfPlayer.avatar_url,
          level: this.selfPlayer.level,
          score: this.selfPlayer.score,
          title: this.selfPlayer.title,
          visual_tier: this.selfPlayer.visual_tier,
          x: this.selfPlayer.x,
          y: this.selfPlayer.y,
          anim: 'idle_down',
          commits: this.selfPlayer.commits,
          stars: this.selfPlayer.stars,
          followers: this.selfPlayer.followers,
          repos: this.selfPlayer.repos,
        });
      }
    });
  }

  emit(event: string, data: any) {
    if (!this.client) {
      if (event === 'player_move') {
        this.selfPlayer.x = data.x;
        this.selfPlayer.y = data.y;
      } else if (event === 'player_chat') {
        setTimeout(() => {
          this.trigger('player_chatted', {
            id: this.selfPlayer.id,
            text: data.text,
            isEmote: !!data.isEmote,
          });

          // Mock automated reply from sleeping NPC
          if (Math.random() < 0.5) {
            setTimeout(() => {
              this.trigger('player_chatted', {
                id: 'sleeping_octocat',
                text: data.isEmote ? 'wave' : 'Welcome to your DevGarden! 🌳 Let\'s code and plant together! 🚀',
                isEmote: data.isEmote,
              });
            }, 1200);
          }
        }, 50);
      }
      return;
    }

    if (!this.channel) return;

    if (event === 'player_move') {
      this.channel.track({
        id: this.selfPlayer.id,
        username: this.selfPlayer.username,
        avatar_url: this.selfPlayer.avatar_url,
        level: this.selfPlayer.level,
        score: this.selfPlayer.score,
        title: this.selfPlayer.title,
        visual_tier: this.selfPlayer.visual_tier,
        x: data.x,
        y: data.y,
        anim: data.anim,
        commits: this.selfPlayer.commits,
        stars: this.selfPlayer.stars,
        followers: this.selfPlayer.followers,
        repos: this.selfPlayer.repos,
      });

      this.channel.send({
        type: 'broadcast',
        event: 'player_moved',
        payload: {
          id: this.selfPlayer.id,
          x: data.x,
          y: data.y,
          anim: data.anim,
        },
      });
    } else if (event === 'player_chat') {
      this.channel.send({
        type: 'broadcast',
        event: 'player_chatted',
        payload: {
          id: this.selfPlayer.id,
          text: data.text,
          isEmote: !!data.isEmote,
        },
      });
    }
  }

  disconnect() {
    if (this.channel) {
      this.channel.unsubscribe();
      this.channel = null;
    }
    this.isConnected = false;
    this.trigger('disconnect');
  }
}
