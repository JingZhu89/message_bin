import { useState, useEffect } from 'react'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

const NewEndpoint = (props) => {
  const [copyText, setCopyText] = useState('Copy');

  const copyUrl = (event) => {
    navigator.clipboard.writeText(props.endpoint);
    setCopyText("Copied!")
  }

  return (
    <div>
      <p>Endpoint created!</p>
	  <p>Your URL is: {props.endpoint} <span className="copytext" onClick={copyUrl}>({copyText})</span></p>
    </div>
  )
}

const RequestList = (props) => {
  const [reqs, setReqs] = useState([]);

  useEffect(() => {
	async function fetchRequests() {
      let result = await fetch(
      'http://localhost:3001/requests/' + props.endpoint, {
      method: "get",
      });
	  result = await result.text();
      try {
        let json = JSON.parse(result);
		setReqs(json);
      } catch(err) {
	    setReqs([]);
      }
	}
	fetchRequests();
	}, [props.endpoint]);

  let output = '';
  if (reqs.length === 0) {
    output = "No requests yet..."
  }
  else {
    output = reqs.map(req => (
      <JsonView key={req} src={req} />
	));
  }

  return (
	<div>
	{output}
	</div>
  )
}

const EndpointList = (props) => {
  const [endpoints, setEndpoints] = useState([]);
  const [chosenEndpoint, setChosenEndpoint] = useState('');

  useEffect(() => {
	async function fetchEndpoints() {
    fetch("http://localhost:3001/uuids")
         .then(res => res.json())
		 .then(data => setEndpoints(data));
	};
	fetchEndpoints();
	}, [props.changed]);
	
  const getUuid = (event) => {
	event.preventDefault();
    props.selectEndpoint(chosenEndpoint);
  }
  
  const chooseUuid = (event) => {
    setChosenEndpoint(event.target.value);
  }
	
  return (
    <div>
	<p>View requests</p>
	<form onSubmit={getUuid}>
	<select value={chosenEndpoint} onChange={chooseUuid}>
	<option value="">Choose an endpoint:</option>
	{endpoints.map(endpoint => (
      <option key={endpoint.uuid} value={endpoint.uuid}> {endpoint.uuid}</option>
	))}
	</select>
	<p><button type="submit">View</button></p>
	</form>
	</div>
  );
}

const MainScreen = () => {
  const [newEndpoint, setNewEndpoint] = useState('');
  const [endpointsChanged, setEndpointsChanged] = useState(false);
  const [chosenEndpoint, setChosenEndpoint] = useState('');

  const generateURL = async (event) => {
    event.preventDefault();
    let result = await fetch(
      'http://localhost:3001/createuuid', {
      method: "get",
    })
    result = await result.text();
    if (result) {
      setNewEndpoint(result);
	  setEndpointsChanged(!endpointsChanged);
    }
  };
  
  const selectEndpoint = (selected) => {
    setChosenEndpoint(selected);
  };

  let url = '';
  if (newEndpoint) {
    url = <NewEndpoint endpoint={newEndpoint} />
  }
  
  let reqs = '';
  if (chosenEndpoint) {
    reqs = <RequestList endpoint={chosenEndpoint} />
  }

  return (
    <div>
      <h3>Questbin</h3>
	  <hr />
      <form onSubmit={generateURL}>
        <button type="submit">Create new endpoint URL</button>
      </form>
      <p>{url}</p>
	  <EndpointList selectEndpoint={selectEndpoint} changed={endpointsChanged} />
	  {reqs}
    </div>
  );
}

export default MainScreen;