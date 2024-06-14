import React from 'react'

const ResultDisplay = ({result}) => {
  return (
    <>
    <h2>Output Code</h2>
    <pre>{result.output}</pre>
    </>
  )
}

export default ResultDisplay