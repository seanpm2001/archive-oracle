import { useState, useEffect } from 'react';

const NarrativeAgenda = ({ onUpdate }: any) => {
  const [mode, setMode] = useState('Narrative'); // 'Narrative' or 'List of Issues'
  const [narrative, setNarrative] = useState(''); // Text for Narrative
  const [issues, setIssues] = useState(['']); // List of issues
  const [actionItems, setActionItems] = useState([{ text: "", assignee: "", dueDate: "" }]);
  const [decisionItems, setDecisionItems] = useState([{ decision: "", rationale: "", opposing: "" }]);

  useEffect(() => {
    if (mode === 'Narrative') {
      setIssues([]);
    } else {
      setNarrative('');
    }
  }, [mode]);

  useEffect(() => {
    onUpdate({ mode, narrative, issues, actionItems, decisionItems });
  }, [mode, narrative, issues, actionItems, decisionItems]);

  const addIssue = () => {
    setIssues([...issues, '']);
  };

  const removeIssue = (index: number) => {
    const newIssues = [...issues];
    newIssues.splice(index, 1);
    setIssues(newIssues);
  };

  const addActionItem = () => {
    setActionItems([...actionItems, { text: "", assignee: "", dueDate: "" }]);
  };

  const removeActionItem = (index: number) => {
    const newActionItems = [...actionItems];
    newActionItems.splice(index, 1);
    setActionItems(newActionItems);
  };

  const addDecisionItem = () => {
    setDecisionItems([...decisionItems, { decision: "", rationale: "", opposing: "" }]);
  };

  const removeDecisionItem = (index: number) => {
    const newDecisionItems = [...decisionItems];
    newDecisionItems.splice(index, 1);
    setDecisionItems(newDecisionItems);
  };

  return (
    <div>
      <h3>Narrative or List of Issues</h3>
      <select onChange={(e) => setMode(e.target.value)} value={mode}>
        <option value="Narrative">Narrative</option>
        <option value="List of Issues">List of Issues</option>
      </select>

      {mode === 'Narrative' ? (
        <textarea
          placeholder="Describe what happened..."
          value={narrative}
          onChange={(e) => setNarrative(e.target.value)}
        />
      ) : (
        <div>
          <h3>Issues</h3>
          {issues.map((issue, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Issue"
                value={issue}
                onChange={(e) => {
                  const newIssues = [...issues];
                  newIssues[index] = e.target.value;
                  setIssues(newIssues);
                }}
              />
              <button onClick={() => removeIssue(index)}>Remove Issue</button>
            </div>
          ))}
          <button onClick={addIssue}>Add Issue</button>
        </div>
      )}

<h3>Action Items</h3>
      {actionItems.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Action Text"
            value={item.text}
            onChange={(e) => {
              const newActionItems = [...actionItems];
              newActionItems[index].text = e.target.value;
              setActionItems(newActionItems);
            }}
          />
          <input
            type="text"
            placeholder="Assignee"
            value={item.assignee}
            onChange={(e) => {
              const newActionItems = [...actionItems];
              newActionItems[index].assignee = e.target.value;
              setActionItems(newActionItems);
            }}
          />
          <input
            type="date"
            placeholder="Due Date"
            value={item.dueDate}
            onChange={(e) => {
              const newActionItems = [...actionItems];
              newActionItems[index].dueDate = e.target.value;
              setActionItems(newActionItems);
            }}
          />
          <button onClick={() => removeActionItem(index)}>Remove Action</button>
        </div>
      ))}
      <button onClick={addActionItem}>Add Action</button>

      <h3>Decision Items</h3>
      {decisionItems.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Decision"
            value={item.decision}
            onChange={(e) => {
              const newDecisionItems = [...decisionItems];
              newDecisionItems[index].decision = e.target.value;
              setDecisionItems(newDecisionItems);
            }}
          />
          <input
            type="text"
            placeholder="Rationale"
            value={item.rationale}
            onChange={(e) => {
              const newDecisionItems = [...decisionItems];
              newDecisionItems[index].rationale = e.target.value;
              setDecisionItems(newDecisionItems);
            }}
          />
          <input
            type="text"
            placeholder="Opposing"
            value={item.opposing}
            onChange={(e) => {
              const newDecisionItems = [...decisionItems];
              newDecisionItems[index].opposing = e.target.value;
              setDecisionItems(newDecisionItems);
            }}
          />
          <button onClick={() => removeDecisionItem(index)}>Remove Decision</button>
        </div>
      ))}
      <button onClick={addDecisionItem}>Add Decision</button>
    </div>
  );
};

export default NarrativeAgenda;
