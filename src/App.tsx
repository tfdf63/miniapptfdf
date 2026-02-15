import { Home } from './components'

function App() {
	return (
		<main className='min-h-screen scroll-smooth bg-background'>
			<div className='container mx-auto max-w-2xl space-y-6 p-4'>
				<Home />
				<div id='about'>{/* <About /> */}</div>
				{/* <Donate />
        <Community /> */}
			</div>
		</main>
	)
}

export default App
