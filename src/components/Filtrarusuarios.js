import React, { useState } from "react";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
import Loader from "../components/Loader";
import { Button } from "primereact/button";

const Filtrarusuarios = () => {
  const [dataset, setDataset] = useState("");
  const [open, setOpen] = useState(false);

  const chooseOptions = {
    label: "Elegir archivo",
    icon: "pi pi-fw pi-plus",
    style: { width: "50%", marginBottom: "5%" },
  };
  const uploadOptions = {
    label: "Subir archivo",
    icon: "pi pi-upload",
    className: "p-button-success",
    style: { width: "50%", marginBottom: "5%" },
  };
  const cancelOptions = {
    label: "Cancelar",
    icon: "pi pi-times",
    className: "p-button-danger",
    style: { width: "50%", marginBottom: "5%" },
  };

  const onUpload = () => {
    toast.success("Archivo cargado");
  };
  const uploadHandler = async (event) => {
    const formData = new FormData();
    const file = event.files[0];

    formData.append("file", file);
    try {
      setOpen(true);
      const response = await fetch("http://127.0.0.1:5000/filtrarUsuarios", {
        //?? asi se hace consulta a api
        method: "POST",
        body: formData,
      });
      if (response.status === 200) {
        const data = await response.json();
        setOpen(false);
        setDataset("");
        setDataset(data.name);
      } else {
        setOpen(false);
        toast.error("API no responde");
      }
    } catch (error) {
      setOpen(false);
      toast.error("Error al cargar el archivo");
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "4%",
        }}
      >
        <Card
          style={{
            marginBottom: "2em",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#34247c" }}>
            Filtrar usuarios con geolocalización activada
          </h1>
          <FileUpload
            name="fileUpload"
            customUpload
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
            uploadHandler={uploadHandler}
            onUpload={onUpload}
            accept="application/json"
            maxFileSize={1000000}
            emptyTemplate={<p className="m-0">Arrastra aquí el archivo</p>}
          />
          <Button
            label="Exportar archivo filtrado"
            style={{ marginTop: 12 }}
            onClick={() =>
              (window.location.href = `http://127.0.0.1:5000/download?fileName=${dataset}`)
            }
            disabled={dataset === ""}
          />
        </Card>
        <Toaster />
        <Loader open={open} />
      </div>
    </div>
  );
};

export default Filtrarusuarios;
