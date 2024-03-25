import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { useLocation, useHistory, useNavigate } from 'react-router-dom';
import './Form.css';
import 'https://kit.fontawesome.com/a54cd7b131.js';
import { AdminHeader } from '../AdminHeader/AdminHeader';
import { Popup } from '../Popup/Popup';
import { Loader } from '../Loader/Loader';

function FormTwo(FormFieldDetails) {

  const [popupMessage, setPopupMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successContent, setSuccessContent] = useState('');

  const webcamRef = React.useRef(null);

  const [isLoad, setIsLoad] = useState(false);


  console.log(FormFieldDetails.FormFieldDetails);


  const location = useLocation();
  const Opening = location.state?.item;
  console.log("openingGot form PrevPage", Opening)

  console.log("In WebCam\n");
  console.log(Opening.OrgId + "");
  var Id = Opening.OrgId + "";


  var tempApplicantDetails = FormFieldDetails.FormFieldDetails;

  const applicantDetails = {
    name: FormFieldDetails.FormFieldDetails.name,
    email: tempApplicantDetails.email,
    dob: tempApplicantDetails.dob,
    gender: tempApplicantDetails.gender,
    openingId: Opening?.openingId,
    experience: tempApplicantDetails.experience,
    departmentId: Opening?.DepartmentId,
    phone: tempApplicantDetails.phone,
    qualification: tempApplicantDetails.qualification,
    sources: tempApplicantDetails.sources,
    skills: tempApplicantDetails.skills,
  };


  console.log("Applicant");
  console.log(applicantDetails);
  console.log("FormDetails");
  console.log(tempApplicantDetails);
  console.log("Opening");
  console.log(Opening);

  const navigate = useNavigate();


  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    const base64ToBlob = (base64, mimeType) => {
      const byteString = atob(base64.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeType });
    };
    const domain = localStorage.getItem("domain");
    // Prepare the image in a form data
    const imageBlob = base64ToBlob(imageSrc, 'image/png');



    const formData = new FormData();
    formData.append('img', imageBlob, 'img.png');
    formData.append('id', Id);

    setIsLoad(true);

    fetch(`http://${domain}/JobVista/FaceTest`, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);

        if (data.isSimilar) {



          fetch(`http://${domain}/JobVista/AddApplicantServlet`, {

            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(applicantDetails)
          }).then((response) => {

            console.log("Apply", applicantDetails);


            if (!response.ok) {


              setPopupMessage(true);
              setIsLoad(false);
              setSuccess(false);
              setSuccessContent("Network Problem");
              // throw new Error("Network Problem");
            }
            return response.json();
          })
            .then(data => {
              console.log(data);
              setPopupMessage(true);
              setIsLoad(false);
              setSuccess(true);
              setSuccessContent(data.message);
              setTimeout(() => {
                navigate('/');
              }, 5000);
            })



        } else if (!data.isSimilar) {
          setPopupMessage(true);
          setIsLoad(false);
          setSuccess(false);
          setSuccessContent("You are already applied");
          setTimeout(() => {
            navigate('/');
          }, 5000);
        }

      })
      .catch(error => {
        console.error(error);
      })
  }, [webcamRef]);



  return (
    <>
      {!isLoad ? <div>

        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '100%', height: 'auto' }}
        />
        <button type="submit" onClick={capture}>Submit</button>
        {popupMessage ? <Popup mainId='mainId' isSuccess={success} content={successContent} /> : ''}

      </div>
      :
      <Loader />
      }
    </>
  );
}

// var formdetail;
var formdetail = {};

function MyForm() {
  const [currentForm, setCurrentForm] = useState('formOne');
  const location = useLocation();
  const item = location.state?.item;

  console.log(item);
  const handleFormOneSubmit = () => {
    console.log(formdetail);
    setCurrentForm('formTwo');
  };

  return (
    <div>
      <AdminHeader className='header' />
      <div className='whole-container'>
        {currentForm === 'formOne' && <FormOne onFormSubmit={handleFormOneSubmit} FormFieldDetails={formdetail} />}
        {currentForm === 'formTwo' && <FormTwo FormFieldDetails={formdetail} />}
      </div>
    </div>
  );
}

export default MyForm;




// function MyForm(FormFieldDetails) {
function FormOne({ onFormSubmit }, FormFieldDetails) {

  const navigate = useNavigate();

  const cancelBtn = () => {
    navigate("/applicant")
  }

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   dob: '',
  //   gender: 'MALE',
  //   experience: 0,
  //   phone: '',
  //   qualification: '',
  //   sources: [{ link: '', platform: '' }],
  //   skills: [{ skill: '', description: '' }]
  // });



  const location = useLocation();
  const Opening = location.state?.item;

  console.log(Opening.experience)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: 'MALE',
    experience: '',
    phone: '',
    qualification: '',
    sources: [{ link: '', platform: '' }],
    skills: [{ skill: '', description: '' }]
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSourceChange = (index, event) => {
    const { name, value } = event.target;
    const newSources = formData.sources.map((source, i) => {
      if (index === i) {
        return { ...source, [name]: value };
      }
      return source;
    });
    setFormData({
      ...formData,
      sources: newSources
    });
  };

  const handleSkillChange = (index, event) => {
    const { name, value } = event.target;
    const newSkills = formData.skills.map((skill, i) => {
      if (index === i) {
        return { ...skill, [name]: value };
      }
      return skill;
    });
    setFormData({
      ...formData,
      skills: newSkills
    });
  };

  const addSource = () => {
    setFormData({
      ...formData,
      sources: [...formData.sources, { link: '', platform: '' }]
    });
  };

  const removeSource = (index) => {
    setFormData({
      ...formData,
      sources: formData.sources.filter((_, i) => i !== index)
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { skill: '', description: '' }]
    });
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(formData);
  //   // Here you would typically send formData to your server or further process it
  // };



  const handleSubmit = (event) => {
    event.preventDefault();
    // formData.
    console.log('Form Data Submitted:', formData);

    formdetail = {
      name: formData.name,
      email: formData.email,
      dob: formData.dob,
      phone: formData.phone,
      sources: formData.sources,
      qualification: formData.qualification,
      gender: formData.gender,
      experience: formData.experience,
      skills: formData.skills
    };

    // FormFieldDetails = formData;
    setFormData(lasval => {
      return {
        ...formData,
        ...FormFieldDetails
      }
    });

    onFormSubmit();
  }



  const [popupMessage, setPopupMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successContent, setSuccessContent] = useState('');





  return (
    <div id='mainContainer'>
      <div className='form-container'>
        {popupMessage ? <Popup isSuccess={success} content={successContent} /> : ''}
        {/* <label>
            Name:
            <input type="text" name="name"  value={formData.name} onChange={handleChange} />
          </label>
          <br /> */}

        <div className="column">
          <label className='commonStyleForm'>
            <p className='commonTextStyle'>Name</p>
            <input className='commonInputStyle' type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <label className='commonStyleForm'>
            <p className='commonTextStyle'>Email</p>
            <input className='commonInputStyle' type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </label>
          <label className='commonStyleForm'>
            <p className='commonTextStyle'>Date of Birth</p>
            <input className='commonInputStyle' type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
          </label>
          <label className='commonStyleForm'>
            <p className='commonTextStyle'>Gender</p>
            <select className='commonInputStyle selectGender' name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </label>


          {(Opening.experience > 0) && (
            <label className='commonStyleForm'>
              <p className='commonTextStyle'>Experience (Years)</p>
              <input className='commonInputStyle' type="number" name="experience" value={formData.experience} onChange={handleInputChange} />
            </label>
          )}

          <label className='commonStyleForm'>
            <p className='commonTextStyle'>Phone</p>
            <input className='commonInputStyle' type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
          </label>
          <label className='commonStyleForm'>
            <p className='commonTextStyle'>Qualification</p>
            <input className='commonInputStyle' type="text" name="qualification" value={formData.qualification} onChange={handleInputChange} />
          </label>

        </div>

        <div className="column">

          {formData.sources.map((source, index) => (
            <div key={index} id='link'>
              <div className="flex-row">
                <label className='commonStyleForm link'>
                  <p>Link</p>
                  <input className='commonInputStyle linkPlatform' type="text" name="link" value={source.link} onChange={(e) => handleSourceChange(index, e)} />
                </label>
                <label className='commonStyleForm link'>
                  <p>Platform</p>
                  <input className='commonInputStyle linkPlatform' type="text" name="platform" value={source.platform} onChange={(e) => handleSourceChange(index, e)} />
                </label>
              </div>

            </div>
          ))}
          <div className="button-group">
            <button className='commonBtnStyle' type="button" onClick={addSource}>Add Source</button>
            <button className='commonBtnStyle removeBtn' type="button" onClick={() => removeSource(formData.sources.length - 1)}>Remove Source</button>

          </div>




          <h3>Skills</h3>
          {formData.skills.map((skill, index) => (
            <div key={index}>
              <div className="flex-row">
                <label className='commonStyleForm'>
                  <p className='commonTextStyle'>Skill</p>
                  <input className='commonInputStyle' type="text" name="skill" value={skill.skill} onChange={(e) => handleSkillChange(index, e)} />
                </label>
                <label className='commonStyleForm'>
                  <p className='commonTextStyle'>Description</p>
                  <input className='commonInputStyle' type="text" name="description" value={skill.description} onChange={(e) => handleSkillChange(index, e)} />
                </label>

              </div>

            </div>
          ))}

          <div className="button-group">

            <button className='commonBtnStyle' type="button" onClick={addSkill} aria-label="Add">Add Skill</button>
            <button className='commonBtnStyle removeBtn' type="button" onClick={() => removeSkill(formData.skills.length - 1)}>Remove Skill</button>

          </div>

        </div>

      </div>

      <footer id='footer'>
        <div id='btnDiv'>
        <button className='btnStyle commonBtnStyle removeBtn' type="submit" onClick={cancelBtn}>Cancel</button>
          <button className='btnStyle commonBtnStyle' type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </footer>
    </div>

  );

}

// export default MyForm;
