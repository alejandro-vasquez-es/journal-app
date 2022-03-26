export const fileUpload = async file => {

	const cloudUrl = 'https://api.cloudinary.com/v1_1/dj54vlrsd/upload';

	const formData = new FormData();
	formData.append('upload_preset', 'journal-app');
	formData.append('file', file);

	try {
		const resp = await fetch(cloudUrl, {
			method: 'POST',
			body: formData
		})

		if (resp.ok) {
			const cloudResp = await resp.json();
			return cloudResp.secure_url;
		} else {
			// throw await resp.json();
			return null;
		}
	} catch (error) {
		console.log(error);
	}

}