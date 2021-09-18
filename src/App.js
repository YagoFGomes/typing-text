import React, { useEffect, useState } from 'react'

import wordList from './resources/words.json'

const maxTypedKeys = 30

const getWords = () => {
    const index = Math.floor(Math.random() * wordList.length)
    const word = wordList[index]
    return word.toLowerCase()
}

const isValidKey = (key, word) => {
    if(!word) {return false;}
    const result = word.split('').includes(key);
    return result;
}

const Word = ({word, validKeys}) => {
    if(!word) return null
    const joinedKeys = validKeys.join('');
    const matched = word.slice(0, joinedKeys.length);
    const remainder = word.slice(joinedKeys.length)

    return (<>
    <span className='matched'>{matched}</span>
    <span className='remainder'>{remainder}</span> 
    </>)
}

const App = () =>{

    const [typedKeys, setTypedKeys] = useState([])
    const [validKeys, setValidKeys] = useState([])
    const [completedWords, setCompletedWords] = useState([])
    
    const [word, setWord] = useState('')

    useEffect(()=>{
        setWord(getWords())
    }, [])

    useEffect(() => {
        const worFromValidKeys = validKeys.join('').toLowerCase();
        if(word && word === worFromValidKeys){
            //Add word ao completedWords ok 
            //limpar o arrayValidKeys ok
            //buscar uma nova palavra
            //verificar se essa proxima lavra nao é repetida
            let newWord = null;
            do{
                newWord = getWords()

            }while(completedWords.includes(newWord))

            setWord(newWord)
            setValidKeys ([])
            setCompletedWords((prev) => [...prev, word])
        }
    }, [word, validKeys, completedWords])
    

    const handleKeyDown = (e)=>{
        e.preventDefault();
        const {key} = e;
        console.log("key " + key)

        setTypedKeys((prevTypedKeys)=> [...prevTypedKeys,key].slice(maxTypedKeys * -1))

            if(isValidKey(key,word)){
                setValidKeys((prev)=>{
                    const isValidLength = prev.length <= word.length
                    const isNextChar = isValidLength && word[prev.length] === key;
                    return (isNextChar) ? [...prev,key] : prev

                })
            }
    }

    return (
        <div className='container' tabIndex='0' onKeyDown={handleKeyDown}>
            <div className='valid-keys'>
                <Word word={word} validKeys={validKeys} />
            </div>
            <div className='typed-keys' >
            {typedKeys ? typedKeys.join(' ') : null}
            </div>
            <div className='completed-words'>
                <ol>
                    {completedWords.map((word)=>{
                        return (<li key={word}>{word}</li>)
                    })} 
                </ol>
            </div>

        </div>
    )
}

export default App;