import React, { useEffect, useMemo, useState } from 'react'
import Button from '../components/UI/Button/Button';
import Filtration from '../components/UI/Filtration/Filtration';
import Input from '../components/UI/Input/Input';
import SkillCreateModal from '../components/UI/modals/SkillCreateModal/SkillCreateModal';
import Spinner from '../components/UI/Spinner/Spinner';
import { createSkill, deleteSkillById, getSkills } from '../http/skillAPI';

const AdminSkills = (() => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');

    const create = async(event) => {
        event.preventDefault();
        setLoading(true);
        await createSkill(newName).then(data => {
            setNewName('');
            getSkills().then(data => {
                setSkills(data);
                setLoading(false);
            })
        })
    }

    const deleteSkill = async(event, id) => {
      event.preventDefault();
      deleteSkillById(id).then(data => {
        setSkills(skills.filter(item => item.tagId !== id));
      })
    }

  useEffect(() => {
    getSkills().then(data => {
        setSkills(data);
        setLoading(false);
    })
  }, [])

  const sortedSkills = useMemo(() => {
    return skills.filter(
            (skill) =>
              skill.tagName.includes(name)
          );
  }, [name, skills]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
        <SkillCreateModal
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        title="Create tag"
        newName={newName}
        setNewName={setNewName}
        create={create}
      ></SkillCreateModal>
         <Filtration>
        <div style={{ display: "flex" }}>
          <Input
            type="text"
            holder="Name"
            style={{ marginRight: 20 }}
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>
      </Filtration>

            <Button onClick={() => setModalVisible(true)} style={{marginBottom: 20}}>Add new tag</Button>

      <table>
        <thead>
          <tr>
            <th>Tag id</th>
            <th>name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedSkills.map((skill) => (
            <tr key={skill.tagId}>
              <td>{skill.tagId}</td>
              <td>{skill.tagName}</td>
              <td><div onClick={(event) => deleteSkill(event, skill.tagId)} style={{color: 'blue'}}>Delete</div></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
});


export default AdminSkills;