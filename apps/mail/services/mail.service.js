import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

const loggedInUser = {
	email: 'user@appsus.com',
	fullName: 'Mahatma Appsus',
}

_createMails()

const debouncedGet = utilService.debouncePromise(get)

export const mailService = {
	query,
	get,
	debouncedGet,
	remove,
	save,
	getEmptyMail,
	getDefaultFilter,
	getLoggedUser,
}

//status: '', txt: '', isRead: null, isStarred: null, labels: []

function query(filterBy = {}) {
	return storageService.query(MAIL_KEY).then(mails => {
		mails.sort((mail1, mail2) => mail2.sentAt - mail1.sentAt)
		if (filterBy.txt) {
			const regExp = new RegExp(filterBy.txt, 'i')
			mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body) || regExp.test(mail.from))
		}
		if (filterBy.isRead !== null) {
			mails = mails.filter(mail => mail.isRead === filterBy.isRead)
		}
		if (filterBy.isStarred !== null) {
			mails = mails.filter(mail => mail.isStarred === filterBy.isStarred)
		}
		if (filterBy.status) {
			switch (filterBy.status) {
				case 'inbox':
					mails = mails.filter(mail => mail.to === loggedInUser.email)
					break
				case 'sent':
					mails = mails.filter(mail => mail.from === loggedInUser.email)
					break
				case 'trash':
					mails = mails.filter(mail => mail.removedAt)
					break
				case 'draft':
					console.log('no drafts ')
					break
			}
		}

		return mails
	})
}

function get(mailId) {
	return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
	return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
	if (mail.id) {
		return storageService.put(MAIL_KEY, mail)
	} else {
		return storageService.post(MAIL_KEY, mail)
	}
}

function getEmptyMail(
	subject = '',
	body = '',
	sentAt = '',
	from = '',
	to = '',
	isRead = false,
	isStarred = false,
	removedAt = null
) {
	return { id: '', subject, body, sentAt, from, to, isRead, isStarred, removedAt }
}

function getDefaultFilter() {
	return { status: '', txt: '', isRead: null, isStarred: null, labels: [] }
}

function getLoggedUser() {
	return loggedInUser
}

function _createMail(subject, body, sentAt, from, to, isRead, isStarred, removedAt = null) {
	const mail = getEmptyMail(subject, body, sentAt, from, to, isRead, isStarred, removedAt)
	mail.id = utilService.makeId()
	return mail
}

function _createMails() {
	let mails = utilService.loadFromStorage(MAIL_KEY)
	if (!mails || !mails.length) {
		mails = []
		mails.push(
			_createMail(
				'm',
				'Would love to catch up sometimes!',
				1551133930594,
				'superlongemail@superlongcompany.com',
				'user@appsus.com',
				false,
				false
			)
		)
		mails.push(
			_createMail(
				'Miss you very much!',
				'Would love to catch up sometimes!',
				1551133930594,
				'momo@momo.com',
				'user@appsus.com',
				true,
				true
			)
		)
		mails.push(
			_createMail(
				'Miss you!',
				'Would love to catch up sometimes!',
				1551133930594,
				'momo@momo.com',
				'user@appsus.com',
				false,
				true
			)
		)
		mails.push(
			_createMail(
				'Miss you!',
				utilService.makeLorem(),
				1551133930594,
				'momo@momo.com',
				'user@appsus.com',
				true,
				false
			)
		)
		utilService.saveToStorage(MAIL_KEY, mails)
	}
}

// const mail = {
// 	id: utilService.makeId(),
// 	subject: 'Miss you!',
// 	body: 'Would love to catch up sometimes, '
// 	sentAt: 1551133930594,
// 	from: 'momo@momo.com',
// 	to: 'user@appsus.com',
// 	isRead: false,
// 	removedAt: null,
// }
