import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete=(pasteId)=>{
      dispatch(removeFromPastes(pasteId));
  }

  const handleShare=async (paste) => {
    if(navigator.share){
        try {
            await navigator.share({
                title: paste.title,
                text: paste.content,
                url: window.location.href,
            });
            toast.success("Shared successfully!");
        } catch (error){
            toast.error("Error sharing the paste.");
        }
    } else {
        navigator.clipboard.writeText(`${paste.title}\n\n${paste.content}`);
        toast.info("Sharing not supported. Content copied to clipboard.");
    }
  };

  return <div>
    <input 
    className="p-2 rounded-2xl min-w-[600px] mt-5 bg-black"
    type='search'
    placeholder="search here"
    value={searchTerm}
    onChange={(e)=>setSearchTerm(e.target.value)}
    />
    <div className="flex flex-col gap-5 mt-4">
    {
        filteredData.length>0 && 
        filteredData.map((paste)=>{
            return (
                <div className="border" key={paste?._id}>
                    <div>
                        {paste.title}
                    </div>
                    <div className="mt-4">
                        {paste.content}
                    </div>
                    <div className="flex flex-row gap-4 place-content-evenly mt-4">
                        <button>
                            <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                        </button>
                        <button>
                        <a href={`/pastes/${paste?._id}`}>View</a>
                        </button>
                        <button onClick={()=>handleDelete(paste?._id)}>Delete</button>
                        <button onClick={()=>{navigator.clipboard.writeText(paste?.content);
                            toast.success("Copied  to clipboard")
                         }}>Copy</button>
                        <button onClick={()=>handleShare(paste)}>Share</button>
                    </div>
                    <div>
                        {paste.createdAt}
                    </div>
                </div>
            )
        })
    }
    </div>
  </div>;
};

export default Paste;
