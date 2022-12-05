import axios from "axios";
import { useEffect, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import './ResultStyle.css'

const LinkResult = ({ inputValue }) => {

    const [sortenLink, setSortenLink] = useState("");
    const [copied, setCopied] = useState(false)
    const [loading, setLoading] = useState(false)
    const [err, setError] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
            setSortenLink(res.data.result.full_short_link);
        } catch (error) {
            setError(err);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (inputValue.length) {
            fetchData();
        }
    }, [inputValue]);
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false)
        }, 1000);

        return () => clearTimeout(timer);
    }, [copied]);

    if(loading){
        return <p className="noData">Loading...</p>
    }
    if(err){
        return <p className="noData">Something Went Wrong</p>
    }
    

    return (

        <>
            {sortenLink && (
                <div className="result">
                    <p>{sortenLink}</p>

                    <CopyToClipboard text={sortenLink} onCopy={() => setCopied(true)}>
                        <button className={copied ? "copied" : ""}>Click  Here To Copy</button>
                    </CopyToClipboard>

                </div>

            )}
        </>

    )
}

export default LinkResult
