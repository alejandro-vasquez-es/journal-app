import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config'
import { fileUpload } from '../../helpers/fileUpload';

global.scrollTo = jest.fn();

jest.mock('../../helpers/fileUpload', () => ({
	fileUpload: jest.fn(() => {
		return Promise.resolve('https://hola-mundo.com/cosa.jpg');
		//  Because it is called in an await of an async funcition
	})
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {
		uid: 'TESTING',
	},
	notes: {
		active: {
			id: 'D83FRfs5HkjuFQ7n9ksA',
			title: 'none',
			body: 'none'
		}
	}
};

let store = mockStore(initState);



describe('tests in startNewNote', () => {

	beforeEach(() => {

		store = mockStore(initState);

	})

	test('should create a note with startNewNote', async () => {

		await store.dispatch(startNewNote());

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.notesActive,
			payload: {
				id: expect.any(String),
				title: '',
				body: '',
				date: expect.any(Number)
			}
		});

		expect(actions[1]).toEqual({
			type: types.notesAddNew,
			payload: {
				id: expect.any(String),
				title: '',
				body: '',
				date: expect.any(Number)
			}
		});

		const docId = actions[1].payload.id;
		await db.doc(`TESTING/journal/notes/${docId}`).delete();

	});

	test('should load the notes with startLoadingNotes', async () => {

		await store.dispatch(startLoadingNotes('TESTING'));

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.notesLoad,
			payload: expect.any(Array)

		});

		const expected = {
			id: expect.any(String),
			title: expect.any(String),
			body: expect.any(String),
			date: expect.any(Number),
		}


		actions[0].payload.forEach(obj => {
			expect(obj).toMatchObject(expected);
		})


	});

	test('should update the note with startSaveNote', async () => {

		const newNote = {
			id: 'D83FRfs5HkjuFQ7n9ksA',
			title: 'TEST TITLE',
			body: 'TEST BODY'
		}

		await store.dispatch(startSaveNote(newNote));
		// CONSOLE.LOG(ACTIONS);

		const actions = store.getActions();
		expect(actions[0].type).toBe(types.notesUpdated);

		const docRef = await db.doc(`/TESTING/journal/notes/${newNote.id}`).get()

		expect(docRef.data().title).toBe(newNote.title);

	});

	test('should update the url entry with startUploading', async () => {

		const file = new File([], 'foto.jpg');
		await store.dispatch(startUploading(file));

		const docRef = await db.doc('/TESTING/journal/notes/D83FRfs5HkjuFQ7n9ksA').get();
		expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg')

	})

})