const SERVICE_WORKER_PATH = location.hostname === 'michael-levitski.github.io' ? '/google-podcasts/sw.js' : '/sw.js'
const button = document.createElement('a')
const prompted = false

const promptUser = async (e, deferredPrompt) => {
    e.preventDefault()
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') {
        window.location = 'https://podcasts.google.com/'
    } 
}

const convertPromptButton = deferredPrompt => {
    if (prompted) return
    button.textContent = 'Install App'
    button.href = '#'
    button.addEventListener('click', promptUser.bind(null, deferredPrompt))
    prompted = true
}

const registerServiceWorker = async () => {
    await navigator.serviceWorker.register(SERVICE_WORKER_PATH)
}

addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    convertPromptButton(e)
})

if ('serviceWorker' in navigator) {
    button.textContent = 'Open App'
    button.href = './podcasts.html'
    document.body.appendChild(button)

    registerServiceWorker()
}
else {
    alert('Sorry your browser is not compatible with this application.')
    window.location = 'https://podcasts.google.com/'
}
