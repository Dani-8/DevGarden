import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { PlayerState } from './types/index';

export class SupabaseSocket {
  private client: any;
  private channel: RealtimeChannel | null = null;
  private listeners: Record<string, Function[]> = {};
  private selfPlayer: PlayerState;
  private isConnected = false;
  private hasInitializedWorld = false;
  private knownPlayers: Map<string, PlayerState> = new Map();

  constructor(supabaseUrl: string, supabaseAnonKey: string, selfPlayer: PlayerState) {
    if (supabaseUrl && supabaseAnonKey) {
      this.client = createClient(supabaseUrl, supabaseAnonKey);
    } else {
      console.warn('Supabase URL or Anon Key is missing. SupabaseSocket will run in LOCAL/MOCK fallback mode.');
      this.client = null;
    }
    this.selfPlayer = selfPlayer;
    if (selfPlayer && selfPlayer.id) {
      this.knownPlayers.set(selfPlayer.id, selfPlayer);
    }
  }

  getKnownPlayer(id: string): PlayerState | undefined {
    return this.knownPlayers.get(id);
  }

  getKnownPlayers(): Map<string, PlayerState> {
    return this.knownPlayers;
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
            const prevKnown = this.knownPlayers.get(p.id);
            
            const pState: PlayerState = {
              id: p.id,
              username: p.username || prevKnown?.username || 'Dev',
              avatar_url: p.avatar_url || prevKnown?.avatar_url || '',
              level: Number(p.level ?? prevKnown?.level ?? 1),
              score: Number(p.score ?? prevKnown?.score ?? 0),
              title: p.title || prevKnown?.title || 'Sprout',
              visual_tier: p.visual_tier || prevKnown?.visual_tier || 'green',
              x: Number(p.x ?? prevKnown?.x ?? 400),
              y: Number(p.y ?? prevKnown?.y ?? 300),
              anim: p.anim || prevKnown?.anim || 'idle_down',
              scene: p.scene || prevKnown?.scene || 'GardenScene',
              commits: p.commits ?? prevKnown?.commits ?? 0,
              stars: p.stars ?? prevKnown?.stars ?? 0,
              followers: p.followers ?? prevKnown?.followers ?? 0,
              repos: p.repos ?? prevKnown?.repos ?? 0,
              cosmetics: p.cosmetics || prevKnown?.cosmetics || [],
            };
            this.knownPlayers.set(p.id, pState);
            players.push(pState);
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
            if (!this.hasInitializedWorld) {
              this.hasInitializedWorld = true;
              this.trigger('world_init', {
                self: selfInList,
                players: players,
                sleepingNPCs: sleepingNPCs,
              });
            } else {
              this.trigger('players_sync', players);
            }

            this.trigger('sleeping_npcs_update', sleepingNPCs);
          })
          .catch(err => {
            console.error('Error fetching leaderboard for sleeping NPCs:', err);
            if (!this.hasInitializedWorld) {
              this.hasInitializedWorld = true;
              this.trigger('world_init', {
                self: this.selfPlayer,
                players: players,
                sleepingNPCs: [],
              });
            } else {
              this.trigger('players_sync', players);
            }
          });
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        newPresences.forEach((p: any) => {
          if (p.id !== this.selfPlayer.id) {
            const prevKnown = this.knownPlayers.get(p.id);
            const pState: PlayerState = {
              id: p.id,
              username: p.username || prevKnown?.username || 'Dev',
              avatar_url: p.avatar_url || prevKnown?.avatar_url || '',
              level: Number(p.level ?? prevKnown?.level ?? 1),
              score: Number(p.score ?? prevKnown?.score ?? 0),
              title: p.title || prevKnown?.title || 'Sprout',
              visual_tier: p.visual_tier || prevKnown?.visual_tier || 'green',
              x: Number(p.x ?? prevKnown?.x ?? 400),
              y: Number(p.y ?? prevKnown?.y ?? 300),
              anim: p.anim || prevKnown?.anim || 'idle_down',
              scene: p.scene || prevKnown?.scene || 'GardenScene',
              commits: p.commits ?? prevKnown?.commits ?? 0,
              stars: p.stars ?? prevKnown?.stars ?? 0,
              followers: p.followers ?? prevKnown?.followers ?? 0,
              repos: p.repos ?? prevKnown?.repos ?? 0,
              cosmetics: p.cosmetics || prevKnown?.cosmetics || [],
            };
            this.knownPlayers.set(p.id, pState);
            this.trigger('player_joined', pState);
          }
        });
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        leftPresences.forEach((p: any) => {
          this.knownPlayers.delete(p.id);
          this.trigger('player_left', { id: p.id });
        });
      })
      .on('broadcast', { event: 'player_moved' }, ({ payload }) => {
        if (payload.id !== this.selfPlayer.id) {
          const prev = this.knownPlayers.get(payload.id);

          if (prev) {
            prev.x = payload.x;
            prev.y = payload.y;
            prev.anim = payload.anim;
            if (payload.scene) prev.scene = payload.scene;
          } else {
            const newKnown: PlayerState = {
              id: payload.id,
              username: 'Dev',
              avatar_url: '',
              level: 1,
              score: 0,
              title: 'Sprout',
              visual_tier: 'green',
              x: payload.x,
              y: payload.y,
              anim: payload.anim || 'idle_down',
              scene: payload.scene || 'GardenScene',
              commits: 0,
              stars: 0,
              followers: 0,
              repos: 0,
              cosmetics: [],
            };
            this.knownPlayers.set(payload.id, newKnown);
          }
          this.trigger('player_moved', payload);
        }
      })
      .on('broadcast', { event: 'player_chatted' }, ({ payload }) => {
        this.trigger('player_chatted', payload);
      })
      .on('broadcast', { event: 'tree_watered' }, ({ payload }) => {
        this.trigger('tree_watered', payload);
      })
      .on('broadcast', { event: 'decor_placed' }, ({ payload }) => {
        this.trigger('decor_placed', payload);
      })
      .on('broadcast', { event: 'decor_removed' }, ({ payload }) => {
        this.trigger('decor_removed', payload);
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
          scene: this.selfPlayer.scene || 'GardenScene',
          commits: this.selfPlayer.commits,
          stars: this.selfPlayer.stars,
          followers: this.selfPlayer.followers,
          repos: this.selfPlayer.repos,
          cosmetics: this.selfPlayer.cosmetics || [],
        });
      }
    });
  }

  updateCosmetics(cosmetics: string[]) {
    this.selfPlayer.cosmetics = cosmetics;
    if (this.client && this.channel) {
      this.channel.track({
        id: this.selfPlayer.id,
        username: this.selfPlayer.username,
        avatar_url: this.selfPlayer.avatar_url,
        level: this.selfPlayer.level,
        score: this.selfPlayer.score,
        title: this.selfPlayer.title,
        visual_tier: this.selfPlayer.visual_tier,
        x: this.selfPlayer.x,
        y: this.selfPlayer.y,
        anim: this.selfPlayer.anim || 'idle_down',
        scene: this.selfPlayer.scene || 'GardenScene',
        commits: this.selfPlayer.commits,
        stars: this.selfPlayer.stars,
        followers: this.selfPlayer.followers,
        repos: this.selfPlayer.repos,
        cosmetics: cosmetics,
      }).catch(err => {
        console.error('Error re-tracking with new cosmetics:', err);
      });
    }
  }

  updateScene(sceneName: string, x: number, y: number) {
    this.selfPlayer.scene = sceneName;
    this.selfPlayer.x = x;
    this.selfPlayer.y = y;
    if (this.selfPlayer && this.selfPlayer.id) {
      this.knownPlayers.set(this.selfPlayer.id, { ...this.selfPlayer });
    }
    if (this.client && this.channel) {
      this.channel.track({
        id: this.selfPlayer.id,
        username: this.selfPlayer.username,
        avatar_url: this.selfPlayer.avatar_url,
        level: this.selfPlayer.level,
        score: this.selfPlayer.score,
        title: this.selfPlayer.title,
        visual_tier: this.selfPlayer.visual_tier,
        x: x,
        y: y,
        anim: 'idle_down',
        scene: sceneName,
        commits: this.selfPlayer.commits,
        stars: this.selfPlayer.stars,
        followers: this.selfPlayer.followers,
        repos: this.selfPlayer.repos,
        cosmetics: this.selfPlayer.cosmetics || [],
      }).catch(err => {
        console.error('Error re-tracking scene update:', err);
      });

      this.channel.send({
        type: 'broadcast',
        event: 'player_moved',
        payload: {
          id: this.selfPlayer.id,
          x: x,
          y: y,
          anim: 'idle_down',
          scene: sceneName,
        },
      });
    }
  }

  emit(event: string, data: any) {
    if (!this.client) {
      if (event === 'player_move') {
        this.selfPlayer.x = data.x;
        this.selfPlayer.y = data.y;
        if (data.scene) this.selfPlayer.scene = data.scene;
      } else if (event === 'player_chat') {
        setTimeout(() => {
          this.trigger('player_chatted', {
            id: this.selfPlayer.id,
            text: data.text,
            isEmote: !!data.isEmote,
          });

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
      } else if (event === 'decor_place') {
        setTimeout(() => {
          this.trigger('decor_placed', data);
        }, 50);
      } else if (event === 'decor_remove') {
        setTimeout(() => {
          this.trigger('decor_removed', data);
        }, 50);
      }
      return;
    }

    if (!this.channel) return;

    if (event === 'player_move') {
      this.selfPlayer.x = data.x;
      this.selfPlayer.y = data.y;
      this.selfPlayer.anim = data.anim;
      if (data.scene) this.selfPlayer.scene = data.scene;
      if (this.selfPlayer.id) {
        this.knownPlayers.set(this.selfPlayer.id, { ...this.selfPlayer });
      }

      this.channel.send({
        type: 'broadcast',
        event: 'player_moved',
        payload: {
          id: this.selfPlayer.id,
          x: data.x,
          y: data.y,
          anim: data.anim,
          scene: data.scene || this.selfPlayer.scene || 'GardenScene',
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
      this.trigger('player_chatted', {
        id: this.selfPlayer.id,
        text: data.text,
        isEmote: !!data.isEmote,
      });
    } else if (event === 'decor_place') {
      this.channel.send({
        type: 'broadcast',
        event: 'decor_placed',
        payload: data,
      });
    } else if (event === 'decor_remove') {
      this.channel.send({
        type: 'broadcast',
        event: 'decor_removed',
        payload: data,
      });
    }
  }

  disconnect() {
    if (this.channel) {
      this.channel.unsubscribe();
      this.channel = null;
    }
    this.isConnected = false;
    this.hasInitializedWorld = false;
    this.trigger('disconnect');
  }
}