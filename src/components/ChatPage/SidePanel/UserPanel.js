import React, { useRef } from 'react';
import { AiFillCode } from 'react-icons/ai';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';

import { useDispatch, useSelector } from "react-redux";
import firebase from '../../../firebase';
import mime from 'mime-types';
import { setPhothURL } from '../../../redux/actions/user_action'

function UserPanel() {

  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch();
  const handelLogout = () => {
    firebase.auth().signOut();
  }
  const inputOpenImageRef = useRef(null);
  const handleOpenImageOpen = () => {
    inputOpenImageRef.current.click();
  }
  const handleUploadImage = async (event) => {
    const file = event.target.files[0]
    const metadata = { contentType : mime.lookup(file.name) }
    console.log(file)
    
    //스토리지에 파일저장하기
    try{
      let uploadTaskSnapshot = await firebase.storage().ref()
        .child(`user_image/${user.uid}`)
        .put(file, metadata)
        console.log("uploadTaskSnapshot", uploadTaskSnapshot)

        let downloadURL = await uploadTaskSnapshot.ref.getDownloadURL()
        console.log(downloadURL)
        //프로필이미지 수정
      await firebase.auth().currentUser.updateProfile({
        photoURL: downloadURL
      })

      dispatch(setPhothURL(downloadURL))

      await firebase.database().ref("users")
      .child(user.uid)
      .update({image: downloadURL})
    }catch (error) {
      alert(error)
    }
  }
    return (
        <div>
            {/* Logo */}
            <h3 style={{color: "white"}}>
                <AiFillCode/>{""} Chat App
            </h3>
            <div style={{
                display:"flex",marginBotttom:"1rem"
            }}>
              <Image src={ user && user.photoURL } roundedCircle style={{
                width: "30px", height: "30px", marginTop: "3px"
              }}/>

                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" style={{
                    background: "transparent", border: "none"
                  }}>
                    {user && user.displayName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" onClick={handleOpenImageOpen}>
                      프로필 사진 변경
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={handelLogout}>
                      로그아웃
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                  <input type="file"
                    style={{ display:"none"}}
                    ref={inputOpenImageRef}
                    accept="image/jpeg,image/png"
                    onChange={handleUploadImage}
                  />

            </div>
        </div>
    )
}

export default UserPanel