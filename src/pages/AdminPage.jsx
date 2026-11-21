import Text from "../components/atoms/Text";
import Mainlayout from "../components/templates/MainLayout";

export default function AdminPage() {
    return (
        <Mainlayout>
            <Text variant="h2">Panel de administrador</Text>
            <Text>Como administrador puedes editar la información y los atributos de los cualquier ítem desde el panel del cofre.</Text>
        </Mainlayout>
    )
}