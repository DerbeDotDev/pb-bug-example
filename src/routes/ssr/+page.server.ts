import { error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

export const actions = {
	create: async ({ request }) => {
		const body = await request.formData();
		const files = body.getAll('file');

		if (files.length === 0) {
			throw error(400, 'No files provided');
		}

		const promises = [];

		for (let file of files) {
			if (file.size === 0) {
				continue;
			}

			const formData = new FormData();
			formData.append('file', file);

			promises.push(pb.collection('documents').create(formData, { requestKey: null }));
		}

		try {
			await Promise.all(promises);
		} catch (error) {
			console.log(error);
		}

		console.log('yeah');
	}
};
