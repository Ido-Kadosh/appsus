export function MailCompose() {
	console.log('hei:')
	return (
		<section className="mail-compose">
			<header>
				<h2>New Message</h2>
				<div className="icon-container">
					<span className="icon material-symbols-outlined">minimize</span>
					<span className="icon material-symbols-outlined">open_in_full</span>
					<span className="icon material-symbols-outlined">close</span>
					{/* <span class="material-symbols-outlined">close_fullscreen</span> */}
				</div>
			</header>
			<div className="form-container">
				<form>
					<input name="txt" id="txt" type="text" placeholder="To" />
					<input name="txt" id="txt" type="text" placeholder="Subject" />
					<textarea name="txt" id="txt" type="text" />
				</form>
			</div>
		</section>
	)
}
