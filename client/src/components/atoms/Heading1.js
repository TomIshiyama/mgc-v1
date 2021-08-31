import React from "react"
import styled from "styled-components"

const Heading1 = ({ children }) => {
    return <Heading>{children}</Heading>
}

export default Heading1

const Heading = styled.h1`
    border-bottom: 4px solid dimgray;
`
