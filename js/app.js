let echL_tbl = 65;
let del_no = null;

const getdataInfo = (arr) => {
  totalD_tbl = 0;
  totalL_tbl = 0;
  totalLTKA_tbl = 0;
  totalZero = 0;

  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    const elM = Number(el.milk);

    if (elM === 0) {
      totalZero++;
    }

    totalD_tbl++;
    totalL_tbl += elM;
  }

  totalLTKA_tbl = totalL_tbl * echL_tbl;

  return {
    totalD_tbl,
    totalL_tbl,
    totalLTKA_tbl,
    totalZero,
  };
};

const delete2type = (e, e2) => {
  if (e === 1) {
    let emptyData = [];

    localStorage.setItem("milk-counter-data", JSON.stringify(emptyData));
    showListHere();
  } else if (e === 2) {
    let local_milk_data = localStorage.getItem("milk-counter-data");
    let parsed = JSON.parse(local_milk_data);

    for (let i = 0; i < parsed.length; i++) {
      const el = parsed[i];

      if (el.id - 1 === e2) {
        parsed.splice(i, 1);
      }
    }

    localStorage.setItem("milk-counter-data", JSON.stringify(parsed));

    let local_milk_data1 = localStorage.getItem("milk-counter-data");
    showList(JSON.parse(local_milk_data1));

    show_Notification("Deleted!");
  }

  _css(q_s(".resetBox"), {
    visibility: "hidden",
  });
};

const show_Notification = (e) => {
  let div = create_("div");

  a_class(div, "style_notification");
  a_class(div, "showNotificationAnim");

  div.textContent = e;

  append_(q_s("body"), div);

  on_(div, "animationend", () => {
    div.remove();
  });
};

const update_edit_price_local_and_live_list = (e) => {
  let updVl = e.target.parentNode.parentNode.children[0].value;

  echL_tbl = updVl;

  showListHere();

  show_Notification("Updated!");
};

const cancel_edit_price_local_and_live_list = (e) => {
  _css(e.target.parentNode.parentNode, {
    visibility: "hidden",
  });

  _css(e.target.parentNode.parentNode.parentNode.children[0], {
    visibility: "visible",
  });
};

const edit_price_local_and_live_list = (e) => {
  _css(e.target.parentNode, {
    visibility: "hidden",
  });

  _css(e.target.parentNode.parentNode.children[1], {
    visibility: "visible",
  });
};

const showListHere = () => {
  let local_milk_data = localStorage.getItem("milk-counter-data");
  showList(JSON.parse(local_milk_data));
};

const edit_local_and_live_list = (e) => {
  _css(q_s(".updateListDiv"), {
    visibility: "visible",
  });

  //#update_containID .update

  let local_milk_data = localStorage.getItem("milk-counter-data");
  let parsed = JSON.parse(local_milk_data);

  parsed.forEach((it, i) => {
    if (it.id === e) {
      q_s("#update_date").value = it.date;
      q_s("#update_milk").value = it.milk;

      s_attr(q_s("#update_containID .update"), "data-milkupdatei", i);
    }
  });
};

const delete_from_local_and_live_list = function (e2) {
  s_attr(q_s("#do_reset"), "data-deletetype", "2");
  del_no = e2;

  let local_milk_data = localStorage.getItem("milk-counter-data");
  let parsed = JSON.parse(local_milk_data);

  for (let i = 0; i < parsed.length; i++) {
    const el = parsed[i];

    if (el.id - 1 === e2) {
      //surebox
      q_s("#surebox").textContent = `Delete ${el.date}`;
    }
  }

  _css(q_s(".resetBox"), {
    visibility: "visible",
  });
};

const showList = (arr) => {
  let sirial_arrTbl = arr.sort((a, b) => {
    return a.id - b.id;
  });

  let tblArr = [];
  tblArr.push({
    c: 1,
    data: ["Date", "Milk (litre)", "Edit", "Delete"],
  });
  for (let i = 0; i < sirial_arrTbl.length; i++) {
    const el = sirial_arrTbl[i];
    let elID = el.id;

    tblArr.push({
      c: (elID += 1),
      data: [
        el.date,
        el.milk,
        `<button onclick="edit_local_and_live_list(${(elID -= 1)})">Edit</button>`,
        `<button onclick="delete_from_local_and_live_list(${(elID -= 1)})">Delete</button>`,
      ],
    });
  }

  let table = mk_table(tblArr);

  for (let i = 0; i < table.children.length; i++) {
    const el = table.children[i];

    if (Number(el.children[1].textContent) === 0) {
      _css(el, {
        background: "#e98888",
      });
    }
  }

  _css(table.children[0], {
    position: "sticky",
    top: 0,
    background: "rgba(220,220,220,1)",
    "z-index": "1",
  });
  _css(table, {
    position: "relative",
    width: "100%",
    "text-align": "center",
    "padding-top": "40px",
    background: "rgba(220,220,220,0.5)",
    "border-collapse": "collapse",
  });

  q_s(".showListDiv").innerHTML = "";

  let h2_ = create_("h2");
  h2_.textContent = "This Month";

  _css(h2_, {
    width: "100%",
    "text-align": "center",
    background: "rgba(220,220,220,0.7)",
  });

  let div = create_("div");
  div.id = "table_1st";

  append_(q_s(".showListDiv"), h2_);
  append_(q_s(".showListDiv"), table);
  append_(q_s(".showListDiv"), div);

  let info_ = getdataInfo(sirial_arrTbl);

  let tblArr2 = [];
  tblArr2.push({
    c: 1,
    data: [
      "Total Milk (days)",
      "Total Milk (litre)",
      "Each Litre (taka)",
      "Total Litre (taka)",
    ],
  });

  tblArr2.push({
    c: 2,
    data: [
      `${info_.totalD_tbl} - ${info_.totalZero} = ${
        info_.totalD_tbl - info_.totalZero
      }`,
      info_.totalL_tbl.toFixed(2),
      `
      <div style="position:relative">
        <div style="position:absolute;height:100%;width:100%;" class="fd-x fx-x-c fx-y-c">
          ${echL_tbl}
          <button onclick="edit_price_local_and_live_list(event)" style="margin-left: 10px;">Edit</button>
        </div>
    
        <div style="visibility:hidden;" class="fd-y">
          <input type="text" id="costUpdate">

          <div style="align-self:flex-end">
            <button style="margin-left: 10px;margin-top: 10px;" onclick="cancel_edit_price_local_and_live_list(event)">Cancel</button>
            <button style="margin-left: 10px;margin-top: 10px;" onclick="update_edit_price_local_and_live_list(event)">Update</button>
          </div>  
        </div>
      </div>
      `,
      info_.totalLTKA_tbl,
    ],
  });

  let table2 = mk_table(tblArr2);
  _css(table2.children[0], {
    background: "rgba(220,220,220,1)",
    "z-index": "1",
  });
  _css(table2, {
    position: "relative",
    width: "100%",
    "text-align": "center",
    "padding-top": "40px",
    background: "rgba(220,220,220,0.5)",
    "border-collapse": "collapse",
  });

  q_s(".showCountsDiv").innerHTML = "";
  append_(q_s(".showCountsDiv"), table2);
};

const init_function_arr = [
  //get data
  {
    q_s: q_s("#get_data"),
    ev: "click",
    f: () => {
      let txt = "";
      txt += `Date/Milk (litre)\n\n`;

      let local_milk_data = localStorage.getItem("milk-counter-data");
      let parsed = JSON.parse(local_milk_data);

      for (let i = 0; i < parsed.length; i++) {
        const el = parsed[i];

        txt += `${el.date}: ${el.milk}\n`;
      }

      let sirial_arrTbl = parsed.sort((a, b) => {
        return a.id - b.id;
      });

      let dta_ = getdataInfo(sirial_arrTbl);

      let total_s = `Total Milk (days): ${dta_.totalD_tbl} - ${
        dta_.totalZero
      } = ${dta_.totalD_tbl - dta_.totalZero}\nTotal Milk (litre): ${
        dta_.totalL_tbl
      }\nEach Litre (taka): ${echL_tbl}\nTotal Litre (taka): ${
        dta_.totalLTKA_tbl
      }`;

      txt += `\n${total_s}`;

      let download_name = ``;

      for (let i = 0; i < parsed.length; i++) {
        const el = parsed[i];

        const getDay = new Date(`${el.date}`).getDate();

        if (getDay === 1) {
          download_name = el.date;

          break;
        }
      }

      let a_ = create_("a");
      let blob = new Blob([txt], {
        type: "text/plain;charset=utf-8",
      });
      a_.href = URL.createObjectURL(blob);
      a_.style.display = `none`;
      a_.download = download_name;
      append_(q_s("body"), a_);
      a_.click();
      a_.remove();
    },
  },
  {
    q_s: q_s("#reset_data"),
    ev: "click",
    f: () => {
      s_attr(q_s("#do_reset"), "data-deletetype", "1");
      //surebox
      q_s("#surebox").textContent = "Want to reset?";

      _css(q_s(".resetBox"), {
        visibility: "visible",
      });
    },
  },
  {
    q_s: q_s("#cancel_reset"),
    ev: "click",
    f: () => {
      //cancel_reset do_reset
      _css(q_s(".resetBox"), {
        visibility: "hidden",
      });
    },
  },
  {
    q_s: q_s("#do_reset"),
    ev: "click",
    f: () => {
      if (q_s("#do_reset").dataset.deletetype === "1") {
        delete2type(1);
      } else if (q_s("#do_reset").dataset.deletetype === "2") {
        delete2type(2, del_no);
      }
    },
  },
  //add button on click
  {
    q_s: q_s(".right_bar_bottom"),
    ev: "click",
    f: () => {
      _css(q_s(".add_data_box"), {
        visibility: "visible",
      });
    },
  },
  //add data on cancel, on click
  {
    q_s: q_s(
      ".add_data_box > div > div:nth-child(2) form div:nth-child(3) button"
    ),
    ev: "click",
    f: () => {
      _css(q_s(".add_data_box"), {
        visibility: "hidden",
      });
    },
  },
  //add data on ok, on click
  {
    q_s: q_s(".add_data_box > div > div:nth-child(2) form"),
    ev: "submit",
    f: (e) => {
      e.preventDefault();

      if (q_s("#milk_litre").value !== "" && q_s("#date").value !== "") {
        if (!isNaN(q_s("#milk_litre").value)) {
          let milk_val = Number(q_s("#milk_litre").value).toFixed(2);
          let local_milk_data = localStorage.getItem("milk-counter-data");
          let parsed = JSON.parse(local_milk_data);

          const scrollIntoView_ = () => {
            q_s("#table_1st").scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "nearest",
            });
          };

          if (parsed.length === 0) {
            let dataArr = [];
            let obj = {
              id: 1,
              date: q_s("#date").value,
              milk: milk_val,
            };

            dataArr.push(obj);

            localStorage.setItem("milk-counter-data", JSON.stringify(dataArr));

            showListHere();
            show_Notification("Added!");
            scrollIntoView_();
          } else {
            let getMonth = new Date(`${q_s("#date").value}`).getMonth() + 1;

            for (let i = 0; i < parsed.length; i++) {
              const el = parsed[i];

              const getDay = new Date(`${el.date}`).getDate();

              if (getDay === 1) {
                let getMonth_ = new Date(`${el.date}`).getMonth() + 1;

                if (getMonth_ === getMonth) {
                  let foundMtc = 0;
                  for (let i = 0; i < parsed.length; i++) {
                    const el = parsed[i];

                    if (q_s("#date").value === el.date) {
                      foundMtc = 1;
                    }
                  }

                  if (foundMtc === 0) {
                    let lst_id = parsed[parsed.length - 1].id;
                    let obj = {
                      id: (lst_id += 1),
                      date: q_s("#date").value,
                      milk: milk_val,
                    };

                    parsed.push(obj);
                    localStorage.setItem(
                      "milk-counter-data",
                      JSON.stringify(parsed)
                    );

                    showListHere();
                    show_Notification("Added!");
                    scrollIntoView_();
                  } else {
                    show_Notification("Can not add at same date!");
                  }

                  break;
                } else {
                  show_Notification("Please add at same month!");
                }
              }
            }
          }
        } else {
          show_Notification("Please add a number!");
        }
      } else {
        show_Notification("Fill all the box!");
      }
    },
  },
  {
    q_s: q_s("#update_containID .cancel"),
    ev: "click",
    f: () => {
      _css(q_s(".updateListDiv"), {
        visibility: "hidden",
      });
    },
  },
  {
    q_s: q_s("#update_containID .update"),
    ev: "click",
    f: (e) => {
      let pos_ = Number(e.target.dataset.milkupdatei);

      let local_milk_data = localStorage.getItem("milk-counter-data");
      let parsed = JSON.parse(local_milk_data);

      let obj = {
        id: parsed[pos_].id,
        date: q_s("#update_date").value,
        milk: q_s("#update_milk").value,
      };

      parsed.splice(pos_, 1, obj);
      localStorage.setItem("milk-counter-data", JSON.stringify(parsed));

      showListHere();
      show_Notification("Updated!");
    },
  },
];

let local_milk_data_1 = localStorage.getItem("milk-counter-data");

const initList_ = () => {
  let local_milk_data_1 = localStorage.getItem("milk-counter-data");

  if (JSON.parse(local_milk_data_1).length !== 0) {
    let local_milk_data = localStorage.getItem("milk-counter-data");
    showList(JSON.parse(local_milk_data));
  } else {
    q_s(".showListDiv").innerHTML =
      "<h2>No data in list! Please add some data first.</h2>";
  }
};

if (local_milk_data_1 === null) {
  localStorage.setItem("milk-counter-data", JSON.stringify([]));

  initList_();
} else {
  initList_();
}

init_function_arr.forEach((obj) => {
  on_(obj.q_s, obj.ev, obj.f);
});
