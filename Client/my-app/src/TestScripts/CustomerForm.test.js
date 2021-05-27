import customerform from "../components/CustomerForm"

import react from "react"
import { render, screen } from '@testing-library/react'

test('should show login form', () => {
   // render(<customerform />)
    const input = screen.queryByTestId("testName");
    // Events and assertions...
    console.log(input);
    expect(input).toHaveTextContent("")
  })