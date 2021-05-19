import React from 'react'
import './CountryTable.css'

function CountryTable({ countries }) {
    
    return (
        <div className="countries__table">
            <table>
            <thead>
            <tr>    
            <th>Flag</th>
                <th>Country</th>
                <th>Cases</th>
            </tr>  
            </thead>
            <tbody>
                {
                    countries.map(({ country, cases, countryInfo }) => (
                        <tr>
                            <td><img className="country__img" src={countryInfo.flag} alt="" /></td>
                            <td>{country}</td>
                            <td>{cases}</td>
                        </tr>

                    ))}
            </tbody>
            </table>
        </div>
    )
}

export default CountryTable;