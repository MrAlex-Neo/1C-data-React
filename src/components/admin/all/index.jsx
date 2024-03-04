import { useDispatch, useSelector } from "react-redux";
import { fetchForms } from "../../../redux/slices/forms";
import { fetchRemoveForm } from "../../../redux/slices/forms";
import { useState, useEffect } from "react";
import Dropdown from "../../../elements/Dropdown";

import dalete from "./img/delete.svg";
import update from "./img/pen.svg";
import "./style.css";

const AllForms = () => {
  const dispatch = useDispatch();
  const [window, setWindow] = useState(true);
  const data = useSelector((state) => state.prod.forms.items);
  useEffect(() => {
    dispatch(fetchForms());
  }, []);

  const deletFormHandler = async (e) => {
    const dataIndex = e.target.closest(".eqDelet").dataset.index;
    console.log(dataIndex);
    try {
      const response = await dispatch(fetchRemoveForm(dataIndex));
      console.log(response)
      setWindow(!window)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="Allforms">
      {data.map((elem, i) => {
        return (
          <div className="formBox" key={i}>
            <div className="formHeader">
              <div className="formTitle">
                <h3>
                  {i + 1}.{elem.title}
                </h3>
              </div>
              <div className="equalizerFrom">
                <div
                  className="eqDelet eqImg"
                  data-index={elem._id}
                  onClick={deletFormHandler}
                >
                  <img src={dalete} alt="" />
                </div>
                <div className="eqUpdate eqImg">
                  <img src={update} alt="" />
                </div>
              </div>
            </div>
            <Dropdown options={elem.data} />
          </div>
        );
      })}
    </div>
  );
};
export default AllForms;
