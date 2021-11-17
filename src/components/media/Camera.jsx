import { useState, useEffect, useRef } from 'react'
import './Media.css'

const Camera = () => {
	const [canUseMd, setCanUseMd] = useState(false)
	const videoRef = useRef(null)
	const handleCameraOn = () => cameraOn(videoRef.current)

	useEffect(() => {
		// Körs en gång, när komponenten blir monuted
		setCanUseMd( 'mediaDevices' in navigator )
	}, [])

	return (
		<div className="camera-container">
		{canUseMd ? <video ref={videoRef}></video> : null}
			<div>
				<button onClick={handleCameraOn}> Camera on </button>
			</div>
		</div>
	)
}

async function cameraOn(videoElement) {
	if( !('mediaDevices' in navigator) ) {
		// meddela användaren
		return
	}
	const constraints = {
		video: { facingMode: 'user', width: 400, height: 300 }
	}
	const stream = await navigator.mediaDevices.getUserMedia(constraints)
	videoElement.srcObject = stream
	videoElement.addEventListener('loadedmetadata', () => {
		videoElement.play()
	})
}

export default Camera
