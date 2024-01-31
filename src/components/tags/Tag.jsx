import React, { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import axiosDriver from "../../utils/axios";

const Tag = () => {
    const [value, setvalue] = useState([]);
    const [getTag, setGetTag] = useState([]);
    const handleChange = (val) => setvalue(val)

    useEffect(() => {
        axiosDriver.get(`http://localhost:3000/api/tags`)
        .then((res) => {
            setGetTag(res.data);
        })
    },[])
    return(
        <div>
            {
                getTag.map((item, id) => (
                    <ToggleButtonGroup
                        type="checkbox"
                        key={id}
                        value={value}
                        onChange={handleChange}
                        className="mt-3"
                    >
                        <ToggleButton id={`tbg-btn-${id}`} value={item._id} variant="outline-dark">
                            {item.name}
                        </ToggleButton>
                    </ToggleButtonGroup>
                ))
            }
        </div>
    )
}

export default Tag;