import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { createPhoto } from "../../services/photos"
import { getUserLoggedInInfo } from "../../utils/token"

export default function NewPhoto() {
    const inputRef = useRef(null)
    const navigate = useNavigate()

    const onSubmit = () => {
        // const file = inputRef
        console.log("current: ", inputRef?.current.files[0])
        const file = inputRef?.current.files[0]
        if(!file) {
            alert("Please choose file")
            return
        }
        const formData = new FormData()
        formData.set("file", file)

        createPhoto(formData).then(resp => {
            alert("Created photo successfully")
            navigate(`/photos/${getUserLoggedInInfo()._id}`)
        }).catch(err => {
            alert("Created photo error")
            console.log("err create photo: ", err)
        })
        
    }
    return (
        <div className="container">
            <div className="mb-3">
                <label htmlFor="inputForm" className="me-5">Choose file</label>
                <input ref={inputRef} id='inputForm' type={"file"} />
            </div>
            <div>
                <button onClick={onSubmit} className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}