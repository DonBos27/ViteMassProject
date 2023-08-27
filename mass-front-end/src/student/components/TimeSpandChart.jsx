import React from 'react'
import Chart from "react-apexcharts";
import MaleRegisterd from "./charts/MaleStudent";
function TimeSpandChart() {

    
  return (
    <div>
      <Chart
              
        type="bar"
        width="500"
        {...MaleRegisterd}
    />
    </div>
  )
}

export default TimeSpandChart
