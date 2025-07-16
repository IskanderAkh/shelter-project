import React from 'react'

const countryCityData = {
    Europe: {
        Germany: ['Berlin', 'Hamburg', 'Munich'],
        France: ['Paris', 'Lyon', 'Marseille'],
        Italy: ['Rome', 'Milan', 'Naples'],
        Estonia: ['Tallinn'],
        Latvia: ['Riga'],
        Lithuania: ['Vilnius'],
    },
    Asia: {
        China: ['Beijing', 'Shanghai', 'Guangzhou'],
        Japan: ['Tokyo', 'Osaka', 'Kyoto'],
        India: ['Mumbai', 'Delhi', 'Bangalore'],
        Kyrgyzstan: ['Bishkek', 'Osh'],
        Kazakhstan: ['Almaty', 'Astana'],
        Tajikistan: ['Dushanbe', 'Khujand'],
    },
    'North America': {
        USA: ['New York', 'Los Angeles', 'Chicago'],
        Canada: ['Toronto', 'Vancouver', 'Montreal'],
    },
    Australia: {
        Australia: ['Sydney', 'Melbourne', 'Brisbane'],
    },
}

const shippingRates = {
    Europe: 15,
    Asia: 10,
    'North America': 20,
    Australia: 25,
}

const BillingDetails = ({ country, setCountry, city, setCity, shippingCost, setShippingCost }) => {
    const getContinentFromCountry = (selectedCountry) => {
        return Object.keys(countryCityData).find((continent) =>
            Object.keys(countryCityData[continent]).includes(selectedCountry)
        )
    }

    const handleCountryChange = (selectedCountry) => {
        setCountry(selectedCountry)
        setCity('')
        const continent = getContinentFromCountry(selectedCountry)
        setShippingCost(shippingRates[continent] || 0)
    }

    const availableCities = country
        ? countryCityData[getContinentFromCountry(country)][country]
        : []

    const inputClass =
        'border-slate-200 border-b-[1px] w-full pb-3.5 outline-none placeholder:text-[#707070] '

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-6 mt-10">Billing Details</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <input type="text" placeholder="First Name *" className={`${inputClass} pl-1`} />
                <input type="text" placeholder="Last Name *" className={`${inputClass} pl-1`} />
            </div>

            <input type="text" placeholder="Company Name" className={`${inputClass} pl-1 mt-6`} />

            <div className="mt-6">
                <select
                    className={`${inputClass} bg-white`}
                    value={country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                >
                    <option value="">Select a country *</option>
                    {Object.keys(countryCityData).flatMap((continent) =>
                        Object.keys(countryCityData[continent]).map((countryName) => (
                            <option key={countryName} value={countryName}>
                                {countryName}
                            </option>
                        ))
                    )}
                </select>
            </div>

            <div className="mt-6">
                <select
                    className={`${inputClass} bg-white`}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!country}
                >
                    <option value="">Select a city *</option>
                    {availableCities.map((cityName) => (
                        <option key={cityName} value={cityName}>
                            {cityName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6">
                <input type="text" placeholder="Street Address *" className={`${inputClass} pl-1`} />
                <input type="text" placeholder="Postcode / ZIP *" className={`${inputClass} pl-1`} />
                <input type="tel" placeholder="Phone *" className={`${inputClass} pl-1`} />
                <input type="email" placeholder="Email *" className={`${inputClass} pl-1`} />
                <input
                    type="text"
                    placeholder="Order notes"
                    className={`${inputClass} pl-1`}
                />
            </div>
            <div className="mt-6 text-gray-600 text-sm">
                Shipping Cost: <span className="font-semibold">${shippingCost}</span>
            </div>
        </div>

    )
}

export default BillingDetails
