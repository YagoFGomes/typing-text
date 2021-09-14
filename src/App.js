import react from 'react'

const App = () =>{
    return (
        <div className='container'>
            <div className='valid-keys'>
                <span className='matched'>cata</span>
                <span className='remainder'>tau</span>
            </div>
            <div className='typed-keys'>
                laskdlaskd
            </div>
            <div className='completed-words'>
                <ol>
                    <li>lua</li>
                    <li>cidade</li>
                    <li>carro</li>
                    <li>bola</li>
                </ol>
            </div>

        </div>
    )
}

export default App;