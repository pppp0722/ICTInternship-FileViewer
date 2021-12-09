import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setDir } from "../../redux/actions";

import './components.css';

const Add = (props) => {
    const currentDirPath = useSelector(state => state.dirReducer);
    const dispatch = useDispatch();
    const [dirName, setDirName] = useState();

    const close = () => {
        props.setAdd(false);
    }

    const onSaveFile = async (e) => {
        const formData = new FormData();
        formData.append("path", props.dirPath);

        for(let i=0; i<e.target.files.length; i++){
            formData.append("files", e.target.files[i]);
        }

        axios.post('/api/upload', formData)
        .then((response) => {
            const denied = response.data.split(",");
            denied.pop()
            let added = [];

            for(let i=0; i<e.target.files.length; i++){
                if(denied.indexOf(e.target.files[i].name) === -1){
                    let newFile = [e.target.files[i].name, e.target.files[i].type];
                    added.push(newFile);
                }
            }

            props.setAdded(added);
            alert(`${e.target.files.length}개의 파일 중 ${e.target.files.length - denied.length}개 파일 업로드 성공!`);
            props.setAdd(false);
        }).catch((error) => {
            alert("오류가 발생하였습니다.");
        });
    }

    const handleDirName = (e) =>{
        setDirName(e.target.value);
    }

    const addDir = () => {
        if(dirName === ""){
            alert("디렉토리 명을 입력하십시오.");
            return;
        }

        const formData = new FormData();
        formData.append("path", currentDirPath);
        formData.append("dirName", dirName);

        axios.post('/api/addDir', formData)
        .then((response) => {
            if(response.data === "success"){
                let added = [[dirName, null]];
                props.setAdded(added);
                alert("디렉토리 생성 완료.");
                props.setAdd(false);
            }else if(response.data === "exists"){
                alert("해당 디렉토리가 이미 존재합니다.")
            }else{
                alert("오류가 발생하였습니다.");
            }
        }).catch((error) => {
            alert("오류가 발생하였습니다.");
        });
    }

    return (
        <Wrapper>
            <Inner>
                <Top>
                    <ButtonClose onClick = {close}>X</ButtonClose>
                    <Text1>
                        add at resources/{currentDirPath}
                    </Text1>
                </Top>
                <FormUpload>
                    <div class="filebox">
                        <label for="ex_file">업로드</label>
                        <input type="file" id="ex_file" multiple onChange = {(e) => onSaveFile(e)}/>
                    </div>
                    <Text2>
                        ctrl 누른 상태로 파일 여러개 클릭 시 다중 업로드 가능
                    </Text2>
                </FormUpload>
                <Line/>
                <AddDir>
                    <Text3>
                        디렉토리 생성
                    </Text3>
                    <InputDirName type = "text" value = {dirName} onChange = {handleDirName}/>
                    <ButtonSubmit onClick = {addDir}>
                        생성
                    </ButtonSubmit>
                </AddDir>
            </Inner>
        </Wrapper>
    );
}

export default Add;

const Wrapper = styled.div`
    cursor: default;
    z-index: 99;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Inner = styled.div`
    width: 827px;
    height: 215px;
    background-color: white;
    border: 1px solid grey;
`

const Top = styled.div`
    background-color: #BFEDCC;
    height: 40px;
`

const Text1 = styled.div`
    padding: 7px 0 0 10px;
`

const ButtonClose = styled.button`
    float: right;
    width: 40px;
    height: 40px;
    font-size: 25px;
    cursor: pointer;
    border-style: outset;

    &:hover{
        background-color: #D0D0D0;
    }
`

const FormUpload = styled.div`
    display: flex;
`

const Text2 = styled.div`
    display: inline-block;
    font-size: 25px;
    line-height: 45px;
    margin: 20px 0 0 20px;
`

const Line = styled.div`
    height: 0px;
    border: 1px solid grey;
    width: 95%;
    margin: 0 auto;
`

const AddDir = styled.div`
    height: 50px;
`

const Text3 = styled.div`
    display: inline-block;
    font-size: 25px;
    margin-left: 20px;
    line-height: 45px;
`

const InputDirName = styled.input`
    display: inline-block;
    margin-left: 20px;
    width: 465px;
    height: 30px;
    font-size: 20px;
`;

const ButtonSubmit = styled.button`
    display: inline-block;
    margin: 20px 0 20px 20px;
    padding: 5px 30px 5px 30px;
    color: #000;
    font-size: 25px;
    background-color: #E9F9EE;
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 3px;

    &:hover{
        background-color: #D8E8DD;
    }
`