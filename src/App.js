  import MicRecorder from "mic-recorder-to-mp3"
  import { useEffect, useState, useRef } from "react"
  import axios from "axios"
  const APIKey = process.env.REACT_APP_ASSEMBLYAI_API_KEY

  const assemblyAI = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: APIKey,
      "content-type": "application/json",
      "transfer-encoding": "chunked",
    },
  })

  const App = () => {
    const recorder = useRef(null) 
    const audioPlayer = useRef(null) 
    const [blobURL, setBlobUrl] = useState(null)
    const [audioFile, setAudioFile] = useState(null)
    const [isRecording, setIsRecording] = useState(null)
    const sourceCodeStyle = {
      color: 'white',
    };

    useEffect(() => {
      recorder.current = new MicRecorder({ bitRate: 128 })
    }, [])

    const startRecording = () => {
      recorder.current.start().then(() => {
        setIsRecording(true)
      })
    }

    const stopRecording = () => {
      recorder.current
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const file = new File(buffer, "audio.mp3", {
            type: blob.type,
            lastModified: Date.now(),
          })
          const newBlobUrl = URL.createObjectURL(blob)
          setBlobUrl(newBlobUrl)
          setIsRecording(false)
          setAudioFile(file)
        })
        .catch((e) => console.log(e))
    }

    // AssemblyAI
    // States
    const [uploadURL, setUploadURL] = useState("")
    const [transcriptID, setTranscriptID] = useState("")
    const [transcriptData, setTranscriptData] = useState("")
    const [transcript, setTranscript] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      if (audioFile) {
        assemblyAI
          .post("/upload", audioFile)
          .then((res) => setUploadURL(res.data.upload_url))
          .catch((err) => console.error(err))
      }
    }, [audioFile])

    const submitTranscriptionHandler = () => {
      if (!isLoading) {
        setIsLoading(true);
        assemblyAI
          .post("/transcript", {
            audio_url: uploadURL,
          })
          .then((res) => {
            setTranscriptID(res.data.id);
            checkStatusHandler();
          })
          .catch((err) => {
            console.error(err);
            setIsLoading(false);
          });
      }
    };
    

    const checkStatusHandler = async () => {
      setIsLoading(true)
      try {
        await assemblyAI.get(`/transcript/${transcriptID}`).then((res) => {
          setTranscriptData(res.data)
        })
      } catch (err) {
        console.error(err)
      }
    }

    useEffect(() => {
      const interval = setInterval(() => {
        if (transcriptData.status !== "completed" && isLoading) {
          checkStatusHandler()
        } else {
          setIsLoading(false)
          setTranscript(transcriptData.text)

          clearInterval(interval)
        }
      }, 1000)
      return () => clearInterval(interval)
    })

    return (
      <div className='flex flex-col items-center justify-center mt-10 mb-20 space-y-4'>
        <h1 className='text-4xl'>Voice to Text using Assembly Ai</h1>
        <h3 className="text-2xl">Neonflake Enterprises Short Assignment</h3>
        <div>
          <button
            className='btn btn-primary'
            onClick={startRecording}
            disabled={isRecording}
          >
            Record
          </button>
          <button
            className='btn btn-warning'
            onClick={stopRecording}
            disabled={!isRecording}
          >
            Stop
          </button>
        </div>
        <audio ref={audioPlayer} src={blobURL} controls='controls' />
        <button
  className='btn btn-secondary'
  onClick={submitTranscriptionHandler}
  disabled={isLoading} 
>
  Submit for Transcription
</button>


        {isLoading ? (
    <div>
      <p className='text-center'>Please wait for a few seconds...</p>
    </div>
  ) : (
          <div></div>
        )}
        {!isLoading && transcript && (
          <div className='w-2/3 lg:w-1/3 mockup-code'>
            <p className='p-6'>{transcript}</p>
          </div>
        )}
            <div>
        <h4 className="text-2xl">
          Made by Sourav and here is the{' '}
          <a
            href="https://github.com/sourav919/voice-to-text"
            target="_blank"
            rel="noopener noreferrer"
            style={sourceCodeStyle}
          >
            source code
          </a>.
        </h4>
      </div>

      </div>
    )
  }

  export default App
