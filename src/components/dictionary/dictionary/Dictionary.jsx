import React from "react";
import styles from "./dictionaty.module.scss";
import { useState} from "react";
import { useEffect } from "react";
import String from "../string/String";



function Dictionary(){
  const [datas, setDatas] = useState([]);

const getDates = async()=>{
try{
  await fetch("http://localhost:3000/fail.json")
  .then(response => response.json())
  .then(data => setDatas(data));
}catch(error){
  console.log(error);
}
}

useEffect(()=>{
getDates();
},[]);


  const [words,setWords]= useState({ lingua:'',word:'',
    transcription:'',
    translation:''})

  function onChangeWord(ev){
    setWords({...words, word:ev.target.value})
  }
  function onChangeTranscription(ev){
    setWords({...words, transcription:ev.target.value})
  }
  function onChangeTranslation(ev){
    setWords({...words, translation:ev.target.value})
  }
  function onChangeSelect(ev){
    setWords({...words, lingua:ev.target.value})
  }

 const onSubmitForm = (event) =>{
  event.preventDefault();
  let hasError = false; 
  if(words.word===""||words.lingua ===""||words.transcription ===""||words.translation ==="" ){
   hasError = true;
  }
  if(!hasError){
    setDatas([...datas,{
      id:( Math.random().toString(36)),
      lingua: words.lingua,
      word: words.word,
      transcription: words.transcription,
      translation: words.translation
    }]);
    setWords({lingua:'', word:'', transcription:'', translation:''})
  }
 }

 const handleChangeString =(nextString) =>{
const newStr = datas.map((data) => 
    data.id === nextString.id ? nextString : data);
  setDatas(newStr);
 }
 const removeString = (id) =>{
  setDatas(datas.filter((data)=>data.id !== id));
 }

    return (
      <section id="dictionary" className={styles.dictionary__container}>
        <h1 className={styles.dictionary__title}>Словарь</h1>
        <div on className={styles.dictionary__content}>
          <form onSubmit={onSubmitForm} name="formWords" className={styles.dictionary__inputs}>
            <select className={styles.lingua} onChange={onChangeSelect} value={words.lingua} >
              <option value="" disabled>-- Выберите язык --</option>
              <option value="English">Английский</option>
              <option value="Italian">Итальянский</option>
              <option value="French">Французский</option>
              <option value="Chinese">Китайский</option>
              <option value="Turkish">Турецкий</option>
            </select>
            <input
            onChange={onChangeWord}
              className={styles.word}
              placeholder="Введите слово"
            />
            <input
            onChange={onChangeTranscription}
              className={styles.transcription}
              type="text"
              placeholder="Введите транскрипцию"
            />
            <input
             onChange={onChangeTranslation}
              className={styles.translation}
              type="text"
              placeholder="Введите перевод"
            />
            <button className={styles.btn__save} type="submit">
              Сохранить
            </button>
            <button className={styles.btn__reset} type="reset">
              Удалить
            </button>
          </form>
          <div id="dictionary__result" className={styles.result}>
            {
            datas.map((data)=>{
                return(
                  <String
                  data={data}
                  key={data.id}
                  onChange={handleChangeString}
                  removeString={removeString}/>
                )
              })
            }
          </div>
        </div>
      </section>
    );
  }



export default Dictionary;
