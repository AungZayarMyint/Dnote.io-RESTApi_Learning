import React, { useEffect, useState } from "react";
import { Comment } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import { UserCircleIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { formatISO9075 } from "date-fns";

const Details = () => {
  const { id } = useParams();

  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNote = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes/${id}`);
    const note = await response.json();
    setNote(note);
    setLoading(false);
  };

  useEffect((_) => {
    getNote();
  }, []);

  return (
    <>
      {loading ? (
        <Comment
          visible={true}
          height="110"
          width="110"
          ariaLabel="comment-loading"
          wrapperStyle={{
            flex: 1,
            marginTop: 240,
            justifyContent: "center",
            alignItems: "center",
          }}
          wrapperClass="comment-wrapper"
          color="#fff"
          backgroundColor="#F4442E"
        />
      ) : (
        <section className="px-10 mt-10">
          <div className="text-right">
            <Link
              to={"/"}
              className="text-teal-600 font-medium border border-teal-600 px-2 py-2 rounded-md"
            >
              Back
            </Link>
          </div>

          {note.cover_image && (
            <img
              src={`${import.meta.env.VITE_API}/${note.cover_image}`}
              alt={note.title}
              className="my-10 h-64 w-full object-cover"
            />
          )}

          <div className="border-t-4 border-t-teal-600 shadow-lg p-3 mt-4">
            <h3 className="text-3xl font-medium">{note.title}</h3>
            <div className="flex gap-4 my-2">
              {note.createdAt && note.creator && (
                <>
                  <p className="flex items-center gap-2 font-medium text-gray-600">
                    <UserCircleIcon className="w-5 h-5" />{" "}
                    {note.creator.username}{" "}
                  </p>
                  <p className=" flex items-center gap-1 font-medium text-sm text-gray-600">
                    <CalendarDaysIcon className=" w-4 h-4" />
                    {formatISO9075(new Date(note.createdAt), {
                      representation: "date",
                    })}
                  </p>
                </>
              )}
            </div>
            <p className="text-md mt-2">{note.content}</p>
          </div>
        </section>
      )}
    </>
  );
};

export default Details;
