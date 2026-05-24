import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [records, setRecords] = useState([])

  const [sapFile, setSapFile] = useState(null)

  const [utilityFile, setUtilityFile] = useState(null)


  const fetchRecords = async () => {

    try {

      const res = await axios.get(
        'http://127.0.0.1:8000/api/records/'
      )

      setRecords(res.data)

    } catch (error) {

      console.error(error)
    }
  }


  useEffect(() => {

    fetchRecords()

  }, [])


  const uploadSAP = async () => {

    if (!sapFile) return

    const formData = new FormData()

    formData.append('file', sapFile)

    try {

      await axios.post(
        'http://127.0.0.1:8000/api/upload/sap/',
        formData
      )

      fetchRecords()

    } catch (error) {

      console.error(error)
    }
  }


  const uploadUtility = async () => {

    if (!utilityFile) return

    const formData = new FormData()

    formData.append('file', utilityFile)

    try {

      await axios.post(
        'http://127.0.0.1:8000/api/upload/utility/',
        formData
      )

      fetchRecords()

    } catch (error) {

      console.error(error)
    }
  }


  const syncTravel = async () => {

    try {

      await axios.post(
        'http://127.0.0.1:8000/api/sync/travel/'
      )

      fetchRecords()

    } catch (error) {

      console.error(error)
    }
  }


  const approveRecord = async (id) => {

    try {

      await axios.post(
        `http://127.0.0.1:8000/api/approve/${id}/`
      )

      fetchRecords()

    } catch (error) {

      console.error(error)
    }
  }


  const rejectRecord = async (id) => {

    try {

      await axios.post(
        `http://127.0.0.1:8000/api/reject/${id}/`
      )

      fetchRecords()

    } catch (error) {

      console.error(error)
    }
  }


  return (

    <div>

      <h1>Breathe ESG Dashboard</h1>

      <p style={{ textAlign: 'center' }}>
        ESG emissions ingestion and review system
      </p>


      <div className="section">

        <h2>Summary</h2>

        <p>
          Total Records: {records.length}
        </p>

        <p>
          Suspicious Records: {
            records.filter(r => r.suspicious).length
          }
        </p>

        <p>
          Approved Records: {
            records.filter(r => r.status === 'approved').length
          }
        </p>

      </div>


      <div className="section">

        <h2>Upload SAP CSV</h2>

        <input
          type="file"
          onChange={(e) => setSapFile(e.target.files[0])}
        />

        <button onClick={uploadSAP}>
          Upload SAP
        </button>

      </div>


      <div className="section">

        <h2>Upload Utility CSV</h2>

        <input
          type="file"
          onChange={(e) => setUtilityFile(e.target.files[0])}
        />

        <button onClick={uploadUtility}>
          Upload Utility
        </button>

      </div>


      <div className="section">

        <h2>Travel Data</h2>

        <button onClick={syncTravel}>
          Sync Travel Data
        </button>

      </div>


      <div className="section">

        <h2>Emission Records</h2>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>Source</th>
                <th>Activity</th>
                <th>Value</th>
                <th>CO2e</th>
                <th>Status</th>
                <th>Suspicious</th>
                <th>Raw Payload</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {records.length === 0 ? (

                <tr>
                  <td colSpan="8">
                    No records uploaded yet
                  </td>
                </tr>

              ) : (

                records.map(record => (

                  <tr key={record.id}>

                    <td>{record.source}</td>

                    <td>{record.activity}</td>

                    <td>
                      {record.normalized_value} {record.normalized_unit}
                    </td>

                    <td>{record.co2e}</td>

                    <td>{record.status}</td>

                    <td>

                      {record.suspicious ? (

                        <span className="warning">
                          ⚠️ Suspicious
                        </span>

                      ) : (

                        'Normal'

                      )}

                    </td>

                    <td>

                      <div className="payload">

                        {Object.entries(record.original_payload).map(
                          ([key, value]) => (

                            <div key={key}>
                              <strong>{key}</strong>: {String(value)}
                            </div>

                          )
                        )}

                      </div>

                    </td>

                    <td style={{ minWidth: '140px' }}>

                      <button
                        onClick={() => approveRecord(record.id)}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectRecord(record.id)}
                      >
                        Reject
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default App