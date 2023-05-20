import React from 'react'
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CheckBoxV2 from '../CheckBoxV2/CheckBoxV2';
import cl from './MultipleSelect.module.css';
import appCl from '../../../styles/App.css';

export default function MultipleSelect({title, options, callback}) {
    const [select, setSelect] = useState({show: false, input: ''});
    const [items, setItems] = useState([]);
    const selectItem = (selectedItem, selected) => {
        setItems(items.map(item => item.value === selectedItem.value ? ({...selectedItem, selected}) : item))
    }

    useEffect(() => {
        setItems(options.map(item => ({...item, selected: false})));
    }, [options])

    useEffect(() => {
        callback(items.filter(({selected}) => selected).map(({value}) => (value)))
    }, [items])

    const filtered = useMemo(() => {
        return items.filter(item => item.text.toLowerCase().includes(select.input.toLowerCase()));
    }, [select.input, items])

  return (
    <div className={cl.content}>
        <span>{title}</span>
        <div className={cl.select} onClick={() => setSelect({...select, show: !select.show})}>
            <div className={cl.selectedItems}>
                {items.map((item) => 
                item.selected &&
                <div className={cl.selectedItem} key={item.value}>
                    <div className={cl.selectedItem__text}>{item.text}</div>
                    <div className={cl.selectedItem__button} onClick={(e) => {e.stopPropagation(); selectItem(item, false)}}>&times;</div>
                </div>
            )}
            </div>
            {select.show && 
            <div className={cl.menu} onClick={(e) => e.stopPropagation()}>
                <div className={cl.input}>
                    <input type="text" value={select.input} onChange={(e) => setSelect({...select, input: e.target.value})} onClick={(e) => e.stopPropagation()}/>
                </div>
            <div className={[cl.items, appCl.scrollBar].join(' ')}>
                {filtered.map((item) => 
                        <div key={item.value} className={cl.item} onClick={() => selectItem(item, !item.selected)}>
                            <CheckBoxV2 style={{width: 15, height: 15}} check={() => console.log('check')} checked={item.selected}><span>{item.text}</span></CheckBoxV2>
                        </div>
                )}
            </div>
        </div>}
        </div>
    </div>
  )
}
