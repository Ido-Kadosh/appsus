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
	getMailFromSearchParams,
}

//status: '', txt: '', isRead: null, isStarred: null, labels: []

function query(filterBy = {}, sortBy = { read: 1 }) {
	return storageService.query(MAIL_KEY).then(mails => {
		// sort
		if (sortBy.date) {
			mails.sort((mail1, mail2) => {
				if (!(mail2.sentAt - mail1.sentAt)) return mail1.isRead - mail2.isRead
				return (mail2.sentAt - mail1.sentAt) * sortBy.date
			})
		} else if (sortBy.starred) {
			mails.sort((mail1, mail2) => {
				if (!(mail2.isStarred - mail1.isStarred)) return mail1.isRead - mail2.isRead
				return (mail2.isStarred - mail1.isStarred) * sortBy.starred
			})
		} else if (sortBy.read) {
			mails.sort((mail1, mail2) => {
				if (!(mail1.isRead - mail2.isRead)) return mail2.sentAt - mail1.sentAt
				return (mail1.isRead - mail2.isRead) * sortBy.read
			})
		} else if (sortBy.subject) {
			mails.sort((mail1, mail2) => {
				if (!mail1.subject.localeCompare(mail2.subject)) return mail1.isRead - mail2.isRead
				return mail1.subject.localeCompare(mail2.subject) * sortBy.subject
			})
		}

		//filter
		if (filterBy.status !== 'trash') {
			mails = mails.filter(mail => !mail.removedAt)
		}
		if (filterBy.txt) {
			const regExp = new RegExp(filterBy.txt, 'i')
			mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body) || regExp.test(mail.from))
		}
		if (filterBy.isRead !== null && filterBy.isRead !== undefined) {
			mails = mails.filter(mail => mail.isRead === filterBy.isRead)
		}
		if (filterBy.isStarred !== null && filterBy.isStarred !== undefined) {
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

function getMailFromSearchParams(searchParams = { get: () => {} }) {
	return {
		id: '',
		subject: searchParams.get('subject') || '',
		body: searchParams.get('body') || '',
		sentAt: '',
		from: '',
		to: '',
		isRead: '',
		isStarred: '',
		removedAt: '',
	}
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
				'Urgent!',
				`Dear Sir:

I have been requested by the Nigerian National Petroleum Company to contact you for assistance in resolving a matter. The Nigerian National Petroleum Company has recently concluded a large number of contracts for oil exploration in the sub-Sahara region. The contracts have immediately produced moneys equaling US$40,000,000. The Nigerian National Petroleum Company is desirous of oil exploration in other parts of the world, however, because of certain regulations of the Nigerian Government, it is unable to move these funds to another region.
				
You assistance is requested as a non-Nigerian citizen to assist the Nigerian National Petroleum Company, and also the Central Bank of Nigeria, in moving these funds out of Nigeria. If the funds can be transferred to your name, in your United States account, then you can forward the funds as directed by the Nigerian National Petroleum Company. In exchange for your accommodating services, the Nigerian National Petroleum Company would agree to allow you to retain 10%, or US$4 million of this amount.
				
However, to be a legitimate transferee of these moneys according to Nigerian law, you must presently be a depositor of at least US$100,000 in a Nigerian bank which is regulated by the Central Bank of Nigeria.
				
If it will be possible for you to assist us, we would be most grateful. We suggest that you meet with us in person in Lagos, and that during your visit I introduce you to the representatives of the Nigerian National Petroleum Company, as well as with certain officials of the Central Bank of Nigeria.
				
Please call me at your earliest convenience at 18-467-4975. Time is of the essence in this matter; very quickly the Nigerian Government will realize that the Central Bank is maintaining this amount on deposit, and attempt to levy certain depository taxes on it.
				
Yours truly,
				
				Prince Alyusi Islassis`,
				Date.now() - 99999,
				'Alusi@Kingdom.com',
				'user@appsus.com',
				false,
				false
			)
		)
		mails.push(
			_createMail(
				'octopus!!!',
				`				⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠟⠛⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿
				⣿⣿⣿⣿⣿⠟⣉⣤⣶⣾⣿⣿⣿⣿⣷⣶⣤⣉⠻⣿⣿⣿⣿⣿⣿
				⣿⣿⣿⡟⣡⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡌⢻⣿⣿⣿⣿
				⣿⣿⡟⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⢿⣿⣿⣿
				⣿⣿⡇⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⢸⣿⣿⣿
				⣿⣿⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿
				⣿⣿⣇⢹⣿⡿⠋⠉⠻⣿⣿⣿⣿⣿⣿⡿⠟⠿⣿⣿⡇⣸⣿⣿⣿
				⣿⣿⣿⡈⢿⣇⠀⠀⢀⣿⣿⡿⢿⣿⣿⣾⣿⣿⣾⡿⢁⣿⣿⣿⣿
				⣿⠟⢿⣷⡘⣿⣿⣿⣿⣿⣧⣴⣤⣴⣿⣿⣿⣿⣿⢃⣾⡿⠻⣿⣿
				⡏⡄⠸⠟⠃⠈⠛⠛⠿⣿⣿⣿⠿⠛⠛⠻⣿⡿⠁⠘⠿⠇⢀⢹⣿
				⡅⣿⣄⠀⣰⣾⣿⣷⡄⠘⠟⣡⣶⣿⣿⣦⠈⠁⠰⠿⠃⣠⣿⢸⣿
				⣷⡹⢿⡀⢿⣿⣿⣿⣿⠀⣴⣿⣿⡟⢁⡀⠀⢰⣤⣶⣾⣿⢃⣾⣿
				⣿⣿⣦⣀⠸⣿⣿⡟⠃⠸⣿⣿⣿⡇⠘⣛⠂⠾⠿⢟⣋⣵⣿⣿⣿
				⣿⣿⣿⣿⣧⡘⠿⣿⠰⣶⣍⣛⣛⣃⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
				⣿⣿⣿⣿⣿⣿⣶⣤⣀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`,
				Date.now() - 21391293,
				'momo@momo.com',
				'user@appsus.com',
				true,
				true
			)
		)
		mails.push(
			_createMail(
				'Buy our stuff!',
				`Hey Mahatma,
				
I haven't heard back from you and that tells me one of three things:

1) You've already chosen a different company for this, and if that's the case please let me know so I can stop bothering you.
2) Yo're still interested but haven't had the time to get back to me yet.
3) You've fallen and can't get up - in that case let me know and I'll call 911.

Please let me know which one is it because I'm starting to worry... Thanks in advance
and looking forward to hearing from you.`,
				1551133930594,
				'momo@momo.com',
				'user@appsus.com',
				false,
				false
			)
		)
		mails.push(
			_createMail(
				'Regarding your job application',
				`Dear Mahatma,
				
Thank you for your interest in our Full Stack Manager position in our London office. 
We regret to inform you that we have filled this position.
We appreciate your interst in opportunities with us, and will retain your information for consideration for future openings.
we wish you the best of success in your employment search`,
				1551133930594,
				'momo@momo.com',
				'user@appsus.com',
				true,
				false
			)
		)
		mails.push(
			_createMail(
				'Money transfer',
				`Dear Alyusi,
I understand the urgency of the matter. I have the funds ready, and will meet you in Lagos at once.
Looking forward to meeting the representatives of the National Petroleum Company.

Many thanks, 
Mahatma`,
				1683893674944,
				'user@appsus.com',
				'Alusi@Kingdom.com',
				true,
				false
			)
		)
		for (let i = 0; i < 40; i++) {
			mails.push(
				_createMail(
					utilService.makeLorem(utilService.getRandomIntInclusive(3, 6)),
					utilService.makeLorem(utilService.getRandomIntInclusive(25, 150)),
					utilService.getRandomIntInclusive(100000, Date.now()),
					`${utilService.makeLorem(1)}@appsus.com`,
					'user@appsus.com',
					utilService.getRandomIntInclusive(0, 1) ? true : false,
					utilService.getRandomIntInclusive(0, 1) ? true : false,
					utilService.getRandomIntInclusive(0, 5)
						? null
						: utilService.getRandomIntInclusive(100000, Date.now())
				)
			)
		}

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
