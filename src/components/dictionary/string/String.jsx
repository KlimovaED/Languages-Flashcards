import styles from './string.module.scss';
import React, { memo, useState } from 'react';

const String = memo(function String({data,removeString, onChange}){
    

    const [edit,setEdit] =useState(false);
    const [originalData, setOrigonalData] = useState(data);

    const handleEdit = ()=>{
    setOrigonalData(data);
    setEdit(true);
    }

    const saveEdit = async()=>{
    setEdit(false);
    await fetch("http://localhost:3001/words/"+data.id,{
    method:'PUT',
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify(data),
    });  
    }

    const handleCancel =(e)=>{
    onChange(originalData);
    setEdit(false);
    }



    return( 
        <React.Fragment>
    <div key={data.id} className={styles.word__string}>
        
        {edit ? 
            <React.Fragment>
        <p className={styles.word}>{data.lingua}</p>
        <input  type="text"className={styles.word__edit} value={data.word} onChange={(e)=> { onChange({
            ...data, word: e.target.value,
        })}}  />
        <input type="text" className={styles.word__edit} value={data.transcription} onChange={(e)=> { onChange({
            ...data, transcription: e.target.value,
        })}} />
        <input  type="text" className={styles.word__edit} value={data.translation}  onChange={(e)=> { onChange({
            ...data,translation: e.target.value,
        })}}/>
        <button type='button' className={styles.btn__edit} onClick={saveEdit} >Сохранить</button>
        <button type='button' className={styles.btn__delete} onClick={handleCancel} >Отменить</button>
        </React.Fragment>
        : 
    (<React.Fragment>
    <p className={styles.word}>{data.lingua}</p>
        <p className={styles.word}>{data.word}</p>
        <p className={styles.word}>{data.transcription}</p>
        <p className={styles.word}>{data.translation}</p>
        <button type='button' className={styles.btn__edit} onClick={handleEdit} > { edit ? "Сохранить" : "Редактировать"}</button>
        <button type='button' className={styles.btn__delete} onClick={() => removeString(data.id)}>Удалить</button>
        </React.Fragment>
        )}
    </div>
    <hr/>
    </React.Fragment>
    )



})

export default String;