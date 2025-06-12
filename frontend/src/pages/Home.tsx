import Navbar from "../components/Navbar";

const Home = () => {

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-4">
        <h1 className="text-3xl font-bold text-center">Bienvenido a ByteBoard</h1>
      </div>
    </>
  );
};
export default Home;