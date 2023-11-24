import { useState, useEffect } from 'react';
import styles from '../styles/typea.module.css'; 
import { useMyVariable } from '../context/MyVariableContext';
import SelectNames from './SelectNames';
import WorkingDocs from './WorkingDocs';

type SummaryMeetingInfoProps = {
  workgroup: string;
  onUpdate: (info: any) => void;
};

const SummaryMeetingInfo: React.FC<SummaryMeetingInfoProps> = ({ workgroup, onUpdate }) => {
  const { myVariable, setMyVariable } = useMyVariable();
  const [displayedWorkingDocs, setDisplayedWorkingDocs] = useState([{ title: '', link: '' }]);

  const {
    name = 'Weekly',
    date = '',
    host = '',
    documenter = '',
    peoplePresent = '',
    purpose = '',
    meetingVideoLink = '',
    miroBoardLink = '',
    otherMediaLink = '',
    transcriptLink = '',
    mediaLink = '',
    workingDocs = [{ title: '', link: '' }]
  } = myVariable?.summary?.meetingInfo || {};

  const [meetingInfo, setMeetingInfo] = useState({
    name,
    date: "",
    host,
    documenter,
    peoplePresent,
    purpose,
    meetingVideoLink,
    miroBoardLink,
    otherMediaLink,
    transcriptLink,
    mediaLink,
    workingDocs
  });

  const addNewDoc = () => {
    const newDoc = { title: '', link: '' };
    setDisplayedWorkingDocs([...displayedWorkingDocs, newDoc]);
  };

  const handleChange = (e: any, docIndex = null) => {
    const { name, value } = e.target;
  
    if (docIndex !== null) {
      setDisplayedWorkingDocs(prevDisplayedDocs => {
        const updatedDocs = [...prevDisplayedDocs];
        updatedDocs[docIndex] = { ...updatedDocs[docIndex], [name]: value };
        return updatedDocs;
      });      
    } else {
      setMeetingInfo(prevMeetingInfo => {
        const updatedMeetingInfo = { ...prevMeetingInfo, [name]: value };
        return updatedMeetingInfo;
      });
    }
  };
  
  useEffect(() => {
    onUpdate({ ...meetingInfo, workingDocs: [...workingDocs, ...displayedWorkingDocs] });
  }, [meetingInfo, displayedWorkingDocs]);
  
  
  
  const handleSelection = (name: any, selectedNames: any) => {
    const updatedInfo = { ...meetingInfo, [name]: selectedNames };
    setMeetingInfo(updatedInfo);
  };
  

  useEffect(() => {
    // Destructure the current meetingInfo from myVariable.summary.meetingInfo or provide defaults
    const {
      name = 'Weekly',
      date = '',
      host = '',
      documenter = '',
      peoplePresent = '',
      purpose = '',
      meetingVideoLink = '',
      miroBoardLink = '',
      otherMediaLink = '',
      transcriptLink = '',
      mediaLink = '',
      workingDocs = [{ title: '', link: '' }]
    } = myVariable?.summary?.meetingInfo || {};
  
    // Set the local meetingInfo state with the values from myVariable.summary.meetingInfo
    setMeetingInfo({
      name,
      date: '',
      host,
      documenter,
      peoplePresent,
      purpose,
      meetingVideoLink,
      miroBoardLink,
      otherMediaLink,
      transcriptLink,
      mediaLink,
      workingDocs
    });
  }, [myVariable.summary?.meetingInfo]); // Add myVariable.summary.meetingInfo to the dependency array

  return (
    <>
    <div className={styles['row-flex-start']}>
    <div className={styles['form-column-flex']}>
      <div className={styles['row-flex-space-between']}>
          <div className={styles['column-flex']}>
            {myVariable.workgroup?.preferred_template?.meetingInfo?.name == 1 && (<>
            <label className={styles['form-label']}>
              Type of meeting:
            </label>
            <select
                name="name"
                value={meetingInfo.name || ""}
                onChange={handleChange}
                className={styles['form-input']}
                title="Only change this if its not a regular weekly meeting"
            >
                <option value="Weekly">Weekly</option>
                <option value="Biweekly">Biweekly</option>
                <option value="One-off event">One-off event</option>
            </select>
            </>)}
          </div>
          <div className={styles['column-flex']}>
            {myVariable.workgroup?.preferred_template?.meetingInfo?.date == 1 && (<>
            {myVariable.summary?.meetingInfo?.date && (<label className={styles['form-label']}>Date:  (previous meeting {myVariable.summary.meetingInfo.date})</label>)}
            {!myVariable.summary?.meetingInfo?.date && (<label className={styles['form-label']}>Date: </label>)}
            <input
              type="date"
              name="date"
              value={meetingInfo.date || ""}
              onChange={handleChange}
              className={styles['form-input']}
              title="Click the icon on the right to select a date"
            />
            </>)}
          </div>
        </div>
        <div className={styles['row-flex-start']}>
          {myVariable.workgroup?.preferred_template?.meetingInfo?.host == 1 && (
          <div className={styles.people1}>
            <label className={styles['form-label']}>
              Host:
            </label>
            <SelectNames 
              onSelect={(selectedNames: any) => handleSelection('host', selectedNames)} 
              initialValue={meetingInfo.host || ""} 
            />
          </div>)}
          {myVariable.workgroup?.preferred_template?.meetingInfo?.documenter == 1 && (
          <div className={styles.people2}>
            <label className={styles['form-label']}>
              Documenter:
            </label>
            <SelectNames 
              onSelect={(selectedNames: any) => handleSelection('documenter', selectedNames)} 
              initialValue={meetingInfo.documenter || ""} 
            />
          </div>)}  
        </div>
        <div className={styles['row-flex-start']}>
          <div className={styles.people2}>
            {myVariable.workgroup?.preferred_template?.meetingInfo?.peoplePresent == 1 && (<>
            <label className={styles['form-label']}>
              Present:
            </label>
            <SelectNames 
              onSelect={(selectedNames: any) => handleSelection('peoplePresent', selectedNames)} 
              initialValue={meetingInfo.peoplePresent || ""} 
            />
          </>)}
        </div>
      </div>
      {myVariable.workgroup?.preferred_template?.meetingInfo?.workingDocs == 1 && (
        <WorkingDocs handleChange={handleChange} addNewDoc={addNewDoc} docs={displayedWorkingDocs} 
      />)}
    </div>
    <div className={styles['links-column-flex']}>
      {myVariable.workgroup?.preferred_template?.meetingInfo?.purpose == 1 && (<>
      <label className={styles['form-label']}>
        Purpose:
      </label>
      <input
        type="text"
        name="purpose"
        value={meetingInfo.purpose || ""}
        onChange={handleChange}
        className={styles['form-input']}
        title="A sentence on what this group is about. Can be repeated for every summary"
      />
      </>)}
        {myVariable.workgroup?.preferred_template?.meetingInfo?.meetingVideoLink == 1 && (<>
        <label className={styles['form-label']}>
          Meeting video (link):
        </label>
        <input
          type="text"
          name="meetingVideoLink"
          value={meetingInfo.meetingVideoLink || ""}
          onChange={handleChange}
          className={styles['form-input']}
        />
        </>)}
        {myVariable.workgroup?.preferred_template?.meetingInfo?.miroBoardLink == 1 && (<>
        <label className={styles['form-label']}>
          Miro board (link):
        </label>
        <input
          type="text"
          name="miroBoardLink"
          value={meetingInfo.miroBoardLink || ""}
          onChange={handleChange}
          className={styles['form-input']}
        />
        </>)}
        {myVariable.workgroup?.preferred_template?.meetingInfo?.otherMediaLink == 1 && (<>
        <label className={styles['form-label']}>
          Other media (link):
        </label>
        <input
          type="text"
          name="otherMediaLink"
          value={meetingInfo.otherMediaLink || ""}
          onChange={handleChange}
          className={styles['form-input']}
        />
        </>)}
        {myVariable.workgroup?.preferred_template?.meetingInfo?.transcriptLink == 1 && (<>
        <label className={styles['form-label']}>
          Transcript (link):
        </label>
        <input
          type="text"
          name="transcriptLink"
          value={meetingInfo.transcriptLink || ""}
          onChange={handleChange}
          className={styles['form-input']}
        />
        </>)}
        {myVariable.workgroup?.preferred_template?.meetingInfo?.mediaLink == 1 && (<>
        <label className={styles['form-label']}>
          Media (link):
        </label>
        <input
          type="text"
          name="mediaLink"
          value={meetingInfo.mediaLink || ""}
          onChange={handleChange}
          className={styles['form-input']}
          autoComplete='off'
        />
        </>)}
      </div>  
    </div>
    
    </>
  );
};

export default SummaryMeetingInfo;
