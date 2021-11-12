import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardPacksType } from "../../api/api";
import {
  addNewPack,
  deletePack,
  fetchPacksThunk,
  setFilterPackName,
  setPageCount,
  setSortPacks,
  updatedPacksTitle,
} from "../../bll/packsReduser";
import { AppStoreType } from "../../bll/store";
import { Paginator } from "../paginator/Paginator";
import { AddPack } from "./add_pack_modal/AddPack";
import { Pack } from "./pack/Pack";
import s from "../../table.module.css";
import { AuthRedirectComponent } from "../../hoc/AuthRedirectComponent";
import SuperDoubleRange from "../common/range/SuperDoubleRange";
import { Preloader } from "../Preloader/Preloader";

const Packs = React.memo(() => {
  const dispatch = useDispatch();
  const isFetching = useSelector<AppStoreType, boolean>((state) => state.login.isFetching);
  const packs = useSelector<AppStoreType, Array<CardPacksType>>((state) => state.packs.packs);
  const page = useSelector<AppStoreType, number>((state) => state.packs.page);
  const pageCount = useSelector<AppStoreType, number>((state) => state.packs.pageCount);
  const cardPackTotalCount = useSelector<AppStoreType, number>((state) => state.packs.cardPackTotalCount);
  const packsName = useSelector<AppStoreType, string>((state) => state.packs.packName);
  const sortPack = useSelector<AppStoreType, string>((state) => state.packs.sortPack);
  const [editMode, setEditMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(105);
  const value = [min, max];

  useEffect(() => {
    dispatch(fetchPacksThunk(page, pageCount, sortPack, packsName, min, max));
  }, [dispatch, page, pageCount, sortPack, packsName, min, max]);

  const addPackHandle = () => {
    setEditMode(true);
  };

  const findePacksButton = () => {
    dispatch(setFilterPackName(searchValue));
    // packs.filter(pack => pack.name && pack.name.includes(search))
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  let removePack = useCallback(
    (id: string) => {
      dispatch(deletePack(id));
    },
    [dispatch]
  );

  let addNewPackHandle = useCallback(
    (title: string) => {
      dispatch(addNewPack(title));
    },
    [dispatch]
  );

  let addNewPackTitle = useCallback(
    (id: string, newTitle: string) => {
      dispatch(updatedPacksTitle(id, newTitle));
    },
    [dispatch]
  );

  const onPageChanged = (page: number) => {
    dispatch(fetchPacksThunk(page, pageCount, sortPack));
  };

  const setPagesCount = (pageCount: number) => {
    dispatch(setPageCount(pageCount));
  };

  const sortUP = () => {
    dispatch(setSortPacks("0cardsCount"));
  };
  const sortDown = () => {
    dispatch(setSortPacks("1cardsCount"));
  };

  const handleChange = (newValue: number | number[]): void => {
    if (typeof newValue === "object") {
      setMin(newValue[0]);
      setMax(newValue[1]);
    }
  };

  const closePackModal = () => setEditMode(false);

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <div className={s.table_container}>
        <div className={s.sidebar}>
          <h4>Show packs cards</h4>
          <div>
            <button>My</button>
            <button>All</button>
          </div>

          <div>
            <div>
              <span>{min}</span>
              <SuperDoubleRange handleChange={handleChange} value={value} />
              <span>{max}</span>
            </div>
          </div>
        </div>

        <div className={s.table_wrap}>
          <h4>Pack list</h4>
          <div className={s.searchbar}>
            <input type="search" placeholder="search" value={searchValue} onChange={onChangeHandler} />
            <button onClick={findePacksButton} className={s.search_btn}>
              &#128269;
            </button>
            <button onClick={addPackHandle} className={s.add_btn}>
              Add new pack
            </button>
          </div>

          <div className={s.table}>
            {editMode && <AddPack addPack={addNewPackHandle} closeModal={closePackModal} />}
            <div className={s.tbl_wrap}>
              <div className={s.table_title}>
                <span>Name</span>
                <span>Cards</span>
                <span className={s.sort_btns}>
                  sort
                  <button onClick={sortUP}>&#9650;</button>
                  <button onClick={sortDown}> &#9660;</button>
                </span>
                <span>Created by</span>
                <span>Actions</span>
              </div>
              {packs.map((p) => {
                return <Pack key={p._id} pack={p} removePack={removePack} addNewTite={addNewPackTitle} />;
              })}
            </div>
          </div>
          <Paginator
            page={page}
            pageCount={pageCount}
            totalCount={cardPackTotalCount}
            onPageChanged={onPageChanged}
            setPagesCount={setPagesCount}
          />
        </div>
      </div>
    </>
  );
});

export default AuthRedirectComponent(Packs);
