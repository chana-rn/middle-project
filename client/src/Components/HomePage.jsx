import { TabMenu } from "primereact/tabmenu";
import { Link } from "react-router-dom";

const HomePage = () => {
    const items = [
        {
            label: <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>בית</Link>,
            icon: 'pi pi-home',
        },
        {
            label: <Link to="/nav/posts" style={{ textDecoration: 'none', color: 'inherit' }}>מאמרים</Link>,
            icon: 'pi pi-book',
        },
        {
          label: <Link to="/nav/users" style={{ textDecoration: 'none', color: 'inherit' }}>משתמשים</Link>,
          icon: 'pi pi-users',
      } ,
       {
        label: <Link to="/nav/todos" style={{ textDecoration: 'none', color: 'inherit' }}>משימות</Link>,
        icon: 'pi pi-check-square ',
    }
    ];
    return <div className="card" style={{height:"700px"}}>  <div style={{marginBottom:"0"}} className="card">
    <TabMenu model={items} />

</div>

    <h1 style={{margin:"0"}} className="card">!ברוכים הבאים</h1>
    <h3 style={{margin:"0"}} className="card">האתר פותח עי מלי שמואלביץ וחנה רבקה גרינוולד</h3>
    </div>;
};

export default HomePage;
