import { fileUpload } from '../../helpers/fileUpload';

var cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: 'dj54vlrsd',
	api_key: '729275814359759',
	api_secret: '8bcq02YRXoB7UM16MdUHRmMMqNM'
});

describe('Tests in fileUpload', () => {

	test('should upload a file and return the url', async (done) => {

		const resp = await fetch('https://images.pexels.com/photos/7194486/pexels-photo-7194486.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');
		const blob = await resp.blob();

		const file = new File([blob], 'foto.png');
		const url = await fileUpload(file);

		console.log(url);

		expect(typeof url).toBe('string');

		const segments = url.split('/');
		console.log(segments)
		const imageUrl = segments[segments.length - 1].replace('.jpg', '');
		console.log(imageUrl);


		cloudinary.v2.api.delete_resources(imageUrl, () => {
			done();
		});

	});

	test('should return null', async () => {
		const file = new File([], 'foto.png');
		const url = await fileUpload(file);

		expect(url).toBe(null);
	})

})