const { Link } = ReactRouterDOM
const { useEffect } = React
export function Home() {
	useEffect(() => {
		document.title = 'Appsus'
	}, [])

	return (
		<main className="home">
			<section className="img-container">
				<h1>Amazing experience in appsus mail, efficient, useful and friendly</h1>
				<button
					//anchor href with id doesn't work with react, and we don't have hashlinks installed, so we use this hack.
					onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
					className="started-btn">
					Get Started
				</button>
				<img src="https://media.istockphoto.com/id/1093508248/photo/modern-work-table-with-computer-laptop-and-cityscapes-view-from-window-business-concepts-ideas.jpg?s=612x612&w=0&k=20&c=vpMc1UR6KfgPe4GYcFG4x1FfPKLyYsoKqrAJolfBSZs="></img>
			</section>
			<h2 className="our-features">Our Features </h2>
			<section className="card-container">
				<div className="card appsus-mail flex column align-center">
					<img className="card-img" src="./assets/img/mail_logo.svg" alt=""></img>
					<h3>Appsus mail</h3>

					<p>Send and receive mails with our encrypted mailing service</p>

					<Link to="/mail">Learn more</Link>
				</div>

				<div id="our-features" className="card appsus-keep flex column align-center">
					<img className="card-img" src="./assets/img/notes_logo.svg" alt=""></img>
					<h3>Appsus keep</h3>
					<p>Quickly capture what's on your mind. Add notes and photos to Appsus Notes </p>
					<Link to="/note">Learn more</Link>
				</div>

				<div className="card appsus-books flex column align-center">
					<img className="card-img" src="./assets/img/books_logo.png" alt=""></img>

					<h3>Appsus books</h3>
					<p>Search the world's most comprehensive index of full-text books</p>

					<Link to="/book">Learn more</Link>
				</div>
			</section>
			<h2 className="our-team">Our Team </h2>

			<section className="about-us-container flex column">
				<article className="stav flex">
					<div className="stav-img-container">
						<img src="./assets/img/stav-img.jpeg" alt="" />
					</div>
					<div className="about-details flex column">
						<h4>Stav Tohami</h4>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, ad molestias. Voluptates
							nemo explicabo, dolorem quisquam sunt eos tempore rem.
						</p>
					</div>
					<div className="about-tool-bar flex">
						<i className="icon fa-brands fa-instagram"></i>
						<i className="icon fa-brands fa-facebook"></i>
						<i className="icon fa-brands fa-github"></i>
					</div>
				</article>

				<article className="ido flex">
					<div className="ido-img-container">
						<img src="./assets/img/ido-img.jpeg" alt="" />
					</div>
					<div className="about-details flex column">
						<h4>Ido Kadosh</h4>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, ad molestias. Voluptates
							nemo explicabo, dolorem quisquam sunt eos tempore rem.
						</p>
					</div>
					<div className="about-tool-bar flex">
						<a href="https://www.linkedin.com/in/ido-kadosh-717729252/">
							<i className="icon fa-brands fa-linkedin-in"></i>
						</a>
						<i className="icon fa-brands fa-facebook"></i>
						<a href="https://github.com/Ido-Kadosh">
							<i className="icon fa-brands fa-github"></i>
						</a>
					</div>
				</article>
			</section>
		</main>
	)
}
