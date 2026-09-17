import {
    createShowcaseProject,
    toggleShowcaseStar,
    createCollabItem,
    toggleCollabLike,
} from '../db/index.js';

export function registerCafeHandlers(io: any, socket: any) {
    // Showcase Project Creation
    socket.on('cafe_showcase_create', async (data: any) => {
        try {
            const project = await createShowcaseProject({
                title: data.title,
                author: data.author || 'Gardener',
                authorRole: data.authorRole || 'Developer',
                description: data.description,
                tags: Array.isArray(data.tags) ? data.tags : ['General'],
                link: data.link || 'https://github.com',
                stars: data.stars || 1,
                featured: !!data.featured,
            });
            io.emit('cafe_showcase_created', project);
        } catch (err) {
            console.error('Error handling cafe_showcase_create:', err);
        }
    });

    // Showcase Project Star/Like Toggle
    socket.on('cafe_showcase_star', async (data: { id: string; increment: boolean }) => {
        try {
            const updated = await toggleShowcaseStar(data.id, data.increment);
            if (updated) {
                io.emit('cafe_showcase_updated', updated);
            }
        } catch (err) {
            console.error('Error handling cafe_showcase_star:', err);
        }
    });

    // Collab Item Creation
    socket.on('cafe_collab_create', async (data: any) => {
        try {
            const collab = await createCollabItem({
                title: data.title,
                category: data.category || 'Collab',
                author: data.author || 'Gardener',
                authorRole: data.authorRole || 'Developer',
                description: data.description,
                repoUrl: data.repoUrl || 'https://github.com',
                tags: Array.isArray(data.tags) ? data.tags : ['General'],
                seeking: data.seeking || 'Collaborators',
                likes: data.likes || 1,
            });
            io.emit('cafe_collab_created', collab);
        } catch (err) {
            console.error('Error handling cafe_collab_create:', err);
        }
    });
