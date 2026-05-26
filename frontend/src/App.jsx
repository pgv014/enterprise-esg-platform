import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const API_BASE = 'https://enterprise-esg-platform-production.up.railway.app'

function App() {

  const [records, setRecords] = useState([])
  const [sapFile, setSapFile] = useState(null)
  const [utilityFile, setUtilityFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchRecords = async () => {

    try {

      const res = await axios.get(
        `${API_BASE}/api/records/`
      )

      setRecords(res.data)

    } catch (error) {

      console.error(error)
      alert('Failed to fetch records')
    }
  }

  useEffect(() => {

    fetchRecords()

  }, [])


  const uploadSAP = async () => {

    if (!sapFile) {
      alert('Please select a SAP CSV file')
      return
    }

    const formData = new FormData()

    formData.append('file', sapFile)

    try {

      setLoading(true)

      await axios.post(
        `${API_BASE}/api/upload/sap/`,
        formData
      )

      alert('SAP file uploaded successfully')

      fetchRecords()

    } catch (error) {

      console.error(error)
      alert('SAP upload failed')

    } finally {

      setLoading(false)
    }
  }


  const uploadUtility = async () => {

    if (!utilityFile) {
      alert('Please select a Utility CSV file')
      return
    }

    const formData = new FormData()

    formData.append('file', utilityFile)

    try {

      setLoading(true)

      await axios.post(
        `${API_BASE}/api/upload/utility/`,
        formData
      )

      alert('Utility file uploaded successfully')

      fetchRecords()

    } catch (error) {

      console.error(error)
      alert('Utility upload failed')

    } finally {

      setLoading(false)
    }
  }


  const syncTravel = async () => {

    try {

      setLoading(true)

      await axios.post(
        `${API_BASE}/api/sync/travel/`
      )

      alert('Travel data synced')

      fetchRecords()

    } catch (error) {

      console.error(error)
      alert('Travel sync failed')

    } finally {

      setLoading(false)
    }
  }


  const approveRecord = async (id) => {

    try {

      await axios.post(
        `${API_BASE}/api/approve/${id}/`
      )

      fetchRecords()

    } catch (error) {

      console.error(error)
      alert('Approve failed')
    }
  }


  const rejectRecord = async (id) => {

    try {

      await axios.post(
        `${API_BASE}/api/reject/${id}/`
      )

      fetchRecords()

    } catch (error) {

      console.error(error)
      alert('Reject failed')
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

        <button
          onClick={uploadSAP}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload SAP'}
        </button>

      </div>


      <div className="section">

        <h2>Upload Utility CSV</h2>

        <input
          type="file"
          onChange={(e) => setUtilityFile(e.target.files[0])}
        />

        <button
          onClick={uploadUtility}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Utility'}
        </button>

      </div>


      <div className="section">

        <h2>Travel Data</h2>

        <button
          onClick={syncTravel}
          disabled={loading}
        >
          {loading ? 'Syncing...' : 'Sync Travel Data'}
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
