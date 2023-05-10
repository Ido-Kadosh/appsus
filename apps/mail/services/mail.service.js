import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

const loggedInUser = {
	email: 'user@appsus.com',
	fullName: 'Mahatma Appsus',
}

_createMails()

export const mailService = {
	query,
	get,
	remove,
	save,
	getEmptyMail,
	getDefaultFilter,
}

function query(filterBy = {}) {
	return storageService.query(MAIL_KEY).then(mails => {
		if (filterBy.txt) {
			const regExp = new RegExp(filterBy.txt, 'i')
			mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body) || regExp.test(mail.from))
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
	console.log('mail:', mail)
	if (mail.id) {
		return storageService.put(MAIL_KEY, mail)
	} else {
		return storageService.post(MAIL_KEY, mail)
	}
}

function getEmptyMail(subject = '', body = '', sentAt = '', from = '', to = '', isRead, removedAt = null) {
	return { id: '', subject, body, sentAt, from, to, isRead, removedAt }
}

function getDefaultFilter() {
	return { status: '', txt: '', isShowRead: null, isShowStarred: null, labels: [] }
}

function _createMail(subject, body, sentAt, from, to, isRead, removedAt = null) {
	const mail = getEmptyMail(subject, body, sentAt, from, to, isRead, removedAt)
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
				false
			)
		)
		mails.push(
			_createMail(
				'Miss you!',
				'Would love to catch up sometimes, Would love to catch up sometimes, it would be really cool, its gonna be awesome! it would be really cool, its gonna be awesome!, Would love to catch up sometimes, it would be really cool, its gonna be awesome!',
				1551133930594,
				'momo@momo.com',
				'user@appsus.com',
				true
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
