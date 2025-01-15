import React, { useState, useEffect } from 'react';
    import { v4 as uuidv4 } from 'uuid';

    function App() {
      const [tests, setTests] = useState([]);
      const [newTestName, setNewTestName] = useState('');

      useEffect(() => {
        const storedTests = localStorage.getItem('tests');
        if (storedTests) {
          setTests(JSON.parse(storedTests));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('tests', JSON.stringify(tests));
      }, [tests]);

      const handleAddTest = () => {
        if (newTestName.trim() === '') return;
        const newTest = {
          id: uuidv4(),
          name: newTestName,
        };
        setTests([...tests, newTest]);
        setNewTestName('');
      };

      const handleDeleteTest = (id) => {
        setTests(tests.filter((test) => test.id !== id));
      };

      return (
        <div>
          <h1>Test Management</h1>
          <div className="test-form">
            <input
              type="text"
              placeholder="Enter test name"
              value={newTestName}
              onChange={(e) => setNewTestName(e.target.value)}
            />
            <button onClick={handleAddTest}>Add Test</button>
          </div>
          <ul className="test-list">
            {tests.map((test) => (
              <li key={test.id} className="test-item">
                <span>{test.name}</span>
                <button onClick={() => handleDeleteTest(test.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default App;
