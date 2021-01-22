import React, { useState, useEffect } from 'react'
import '../App.css';
import { TextField, InputAdornment, OutlinedInput,Box, Button  } from "@material-ui/core";



const initialFieldValues = {
    Id: 0,
    PostId: 0,
    Title: "",
    Body: "",
    ImageUrl: "https://www.csp.it/wp-content/themes/cardinal/images/default-thumb.png"
};




  


export default function FormNewPost(props) {

    const hadleSubmit = (e) => {
        e.preventDefault();


        props.submit(initialFieldValues);

    };


    const [post, setValue] = useState(initialFieldValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;




        if (name == "Title") {
            initialFieldValues["Title"] = value;
        }
        if (name == "Body") {
            initialFieldValues["Body"] = value;
        }

        if (name == "ImageUrl") {
            initialFieldValues["ImageUrl"] = value;
        }




        setValue({
            initialFieldValues
        });
    }



    const imageDef =()=>{

        if (initialFieldValues.ImageUrl == "https://www.csp.it/wp-content/themes/cardinal/images/default-thumb.png"){
        return "";
    }
    else 
    return initialFieldValues.ImageUrl


}

return (
    <form onSubmit={hadleSubmit} className="FormClass">


        <img src={initialFieldValues.ImageUrl} className="imagePostForm" />

        <div className="divForm">
            <TextField
                className="input"
                type="text"
                value={initialFieldValues.title}
                placeholder="aggiungi todo"
                onChange={handleInputChange}
                name="Title"
                label="Title"
            />

        </div>
        <div className="divForm">
            <TextField
            multiline
                id="standard-basic"
                className="input"
                type="text"
                value={initialFieldValues.body}
                placeholder="aggiungi todo"
                onChange={handleInputChange}
                name="Body"
                label="Testo Blog"
                multiline
                rows={5}                
            />

        </div><div className="divForm">
            <TextField
                className="input"
                type="text"
                value={imageDef()}
                placeholder="aggiungi todo"
                onChange={handleInputChange}
                name="ImageUrl"
                label="ImageUrl"
            />

        </div>
        

        <Button style={{margin: "1em"}} className="btnCustom" type="submit" value="Submit" variant="outlined" color="primary" >Submit</Button>
        <Button style={{margin: "1em"}} className="btnCustom" type="reset" value="Reset" variant="outlined" color="secondary">Reset</Button>
        
    </form>
);

}





