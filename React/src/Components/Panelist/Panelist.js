import React, { useEffect, useState, useRef } from 'react';
import { Heading } from '../Heading/Heading';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import Style from '../Panelist/Panelist.module.css';
import data from './data.json';
import { Input } from '../Input/Input';
import { Image } from '../ImageTag/Image';
import { Popup } from '../Popup/Popup';

export const Panelist = () => {

  const [popupMessage, setPopupMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successContent, setSuccessContent] = useState('');

  const [panelistJson, setPanelistJson] = useState([]);
  const [panelist, setPanelist] = useState(data);
  const [view, setView] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const getValue = useRef();
  const [departments, setDepartments] = useState([]);
  const [editingPanelist, setEditingPanelist] = useState(false);
  const [addView, setAddView] = useState(false);
  const getName = useRef();
  const domain = localStorage.getItem("domain");
  const [panelistDetails, setPanelistDetails] = useState({
    "panelistName": '',
    "panelistEmail": '',
    "panelistPosition": ''
  })
  const [panelistReturnDetails, setPanelistReturnDetails] = useState({
    "name": '',
    "email": '',
    "position": ''
  })

  var userObj = JSON.parse(localStorage.getItem('userDetails'));

  const fetchCallPanelist = () => {
    fetch(`http://${domain}/JobVista/GetPanelist`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/JSON'
      },
      body: JSON.stringify({ 'userDetails': JSON.parse(localStorage.getItem('userDetails')) })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        setPanelistJson(result.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    fetchCallPanelist();
  }, []);




  const fetchCallForDepartment = () => {
    fetch(`http://${domain}/JobVista/GetDepartments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ 'userDetails': userObj })

    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        return response.json();
      })
      .then(data => {
        const departmentsName = data.message.map(department => department.Title);
        setDepartments(departmentsName);
      })
      .catch(error => {
        console.log('Error fetching departments:', error);
      });
  }

  useEffect(() => {
    fetchCallForDepartment();
  }, []);



  const handleAddPanelist = () => {
    setView(true);
    setAddView(true);
  };

  const backBtn = () => {
    setView(false);
    // setAddView(false);
  }

  const addPanelist = () => {

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (!userDetails) {
      console.error('User details not found in local storage.');
      return;
    }

    fetch(`http://${domain}/JobVista/AddPanelist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        panelist: {
          name,
          email,
          gender,
          position,
          password,
          department
        },
        userDetails: userDetails
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add panelist');
        }
        return response.json();
      })
      .then(data => {
        console.log('Panelist added successfully:', data);
        setPanelist([...panelist, data]);
        setName('');
        setEmail('');
        setGender('');
        setDepartment('');
        setPosition('');
        setPassword('');
        setView(false);

        if (data.statusCode == 200) {
          // setformView(false);
          setPopupMessage(true);
          setSuccess(true);
          setSuccessContent(data.message);
        }
        else {
          // setformView(false);
          setPopupMessage(true);
          setSuccess(false);
          setSuccessContent(data.message);
        }
      })
      .catch(error => {
        console.error('Error adding panelist:', error);
      });
  }

  const editPanelist = ((name, email, position) => {
    panelistDetails.panelistName = name;
    panelistDetails.panelistEmail = email;
    panelistDetails.panelistPosition = position;
    setView(false);
    setAddView(false);
    setEditingPanelist(true);
  })

  const submitToEdit = ((Name, Email, Position) => {
    panelistReturnDetails.name = Name;
    panelistReturnDetails.email = Email;
    panelistReturnDetails.position = Position;
  })

  const backBtnForEdit = (() => {
    setView(false);
    setEditingPanelist(false);
  })

  const handleEdit = ((e) => {
    setPanelistDetails.panelistName = e.target.value;
  })

  return (
    <div className={Style.commonStyle}>
      {view && addView ? (
        <div id={Style.addPanelist}>
          <Heading className={Style.title}><i class="fa-regular fa-circle-left" onClick={backBtn}></i> Add Panelist</Heading>
          <div className={`${Style.perfectDiv} ${Style.flx} ${Style.flxDiv}`}>
            <ul className={`${Style.list - 1} ${Style.listing} ${Style.inlineBlock} ${Style.ulWidth1}`}>
              <li>Name</li>
              <li>Email</li>
              <li>Password</li>
              <li>Gender</li>
              <li>Department</li>
              <li>Position</li>
            </ul>
            <ul className={`${Style.list - 1} ${Style.listing} ${Style.inlineBlock} ${Style.ulWidth2}`}>
              <li><Input type="text" value={name} onChange={(e) => setName(e.target.value)} className={Style.panelistInput} /></li>
              <li><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={Style.panelistInput} /></li>
              <li><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={Style.panelistInput} /></li>
              <li className={Style.panelistInput} id={Style.InputLi}>
                <div>
                  <Input ref={getValue} type="radio" name="gender" checked={gender === 'Male'} onChange={() => setGender('Male')} />
                  <label>Male</label>
                </div>

                <div>
                  <Input ref={getValue} type="radio" name="gender" checked={gender === 'Female'} onChange={() => setGender('Female')} />

                  <label>Female</label>
                </div>

                <div>
                  <Input ref={getValue} type="radio" name="gender" checked={gender === 'NB'} onChange={() => setGender('Non-Binary')} />

                  <label>Non Binary</label>
                </div>


              </li>
              <li>
                <Input list='departmentsName' name={department} onChange={(e) => setDepartment(e.target.value)} className={Style.panelistInput} />
                <datalist id='departmentsName'>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </datalist>
              </li>
              <li><Input type="text" value={position} onChange={(e) => setPosition(e.target.value)} className={Style.panelistInput} /></li>
            </ul>
          </div>
          <div className={`${Style.flx} ${Style.CancelOrSubmit}`}>
            <Button id={Style.CancelAddPanelist} onClick={backBtn}>Cancel</Button>
            <Button onClick={addPanelist} id={Style.subId}>Submit</Button>
          </div>
        </div>
      ) : !editingPanelist && !view ? (
        <div id={Style.mainContainer}>
          <div className={Style.flx} id={Style.header}>
            <Heading>Panelist</Heading>
            <Button id={Style.panelistBtn} onClick={handleAddPanelist}>Add Panelist</Button>
          </div>


          <table id={Style.panelistTable}>
            <thead>
              <tr className={Style.panelistTr} id={Style.panelistTr}>
                <th className={Style.commonNameStyle}>Name</th>
                <th>Email</th>
                <th className={Style.commonNameStyle}>Gender</th>
                <th className={Style.commonNameStyle}>Department</th>
                <th className={Style.commonNameStyle}>Roles</th>
                {/* <th className={Style.commonNameStyle}>Edit</th> */}
              </tr>
            </thead>
            {panelistJson.length === 0 ? (
              <tr>
                <td>No Panelists Available</td>
              </tr>
            ) : (
              <tbody id={Style.lists}>
                <div id={Style.scrollContainer}>
                  {panelistJson.map((panelistValue, index) => (
                    <tr className={`${Style.common} ${Style.panelistTr}`} key={index}>
                      <td className={Style.commonNameStyle}>{panelistValue.Name}</td>
                      <td>{panelistValue.Email}</td>
                      <td className={Style.commonNameStyle}>{panelistValue.Gender}</td>
                      <td className={Style.commonNameStyle}>{panelistValue.Title}</td>
                      <td className={Style.commonNameStyle}>{panelistValue.Position}</td>
                      {/* <td className={Style.commonNameStyle}><Button onClick={editPanelist(panelistValue.Name, panelistValue.Email, panelistValue.Position)}>Edit</Button></td> */}
                      {/* <td className={Style.commonNameStyle}><Image src="../../Images/pencil.png" onClick={() => editPanelist(panelistValue.Name, panelistValue.Email, panelistValue.Position)} id={Style.editImage}></Image></td> */}

                      {/*<td><Button>Submit</Button></td>*/}
                    </tr>
                  ))}
                </div>
              </tbody>
            )}
          </table>






        </div>) : null}
      {popupMessage ? <Popup isSuccess={success} content={successContent} /> : ''}
      {editingPanelist ? (
        <div id={Style.panelistEditDiv}>

          <div className={Style.editPanelist}>
            <Text className={Style.panelistName}>Name</Text>
            <Text className={Style.panelistName}>Email</Text>
            <Text className={Style.panelistName}>Position</Text>
          </div>
          <div className={Style.editPanelist}>
            <input value={panelistDetails.panelistName} className={Style.panelistName} ref={getName} onChange={handleEdit}></input>
            <input className={Style.panelistName}></input>
            <input className={Style.panelistName}></input>
          </div>

          <div>
            <Button onClick={submitToEdit}>Submit</Button>
            <Button onClick={backBtnForEdit}>Cancel</Button>
          </div>

        </div>
      ) : ''}
    </div>
  )
}


