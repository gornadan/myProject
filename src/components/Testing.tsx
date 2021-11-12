import React, {useState} from "react";
import SuperInputText from "./common/Input/Input";
import s from './header/Header.module.css'
import SuperCheckbox from "./common/checkbox/Checkbox";
import SuperButton from "./common/button/Button";



function Testing() {
    const [checked, setChecked] = useState<boolean>(false)
    return (
        <div>
            <SuperInputText
                className={s.blue}
            />
            <div>
                <SuperCheckbox   checked={checked}
                                 onChangeChecked={setChecked}/>
            </div>
            <div>
                <SuperButton>
                   click
                </SuperButton>
            </div>
        </div>

    );
}

export default Testing;
