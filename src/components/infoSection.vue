<template>

    <div>

        <b-container>

        <b-row>

        <b-col>

        <h2>
           <i class="fas fa-chess-knight"></i> <b>Deine Vereinbarungen mit MedCastle</b>
        </h2>

         </b-col>

        </b-row>

        <b-row>

        <b-col>

        <b-list-group>
            <b-list-group-item active>Mit dem Bereitstellen des Links gibst du den Inhalt zur Benutzung durch MedCastle frei. </b-list-group-item>
            <b-list-group-item active><b>Du bist der Eigentümer des Inhalts.</b> </b-list-group-item>
            <b-list-group-item>Der Inhalt darf durch MedCastle oder Dritte nicht verkauft werden.</b-list-group-item>
            <b-list-group-item>Der Inhalt darf Online gestellt werden. Damit lässt sich die Weiterverbreitung durch Dritte nicht ausschließen.</b-list-group-item>
            <b-list-group-item>Es gelten </b-list-group-item>
        </b-list-group>
        

        </b-col>

        <b-col>

        <p>Es geht hier nur um die Basics, aber es ist wichtig sie abzudecken, damit sich niemand misversteht. Der blau unterlegte Punkt ist am wichtigsten.</p>

        </b-col>

        </b-row>

        </b-container>
        
    </div>

</template>

<script>

export default {
    name: 'infoSection'
}

</script>

<style scoped>

h2 {
    float: left;
}

p {
    float: left;
    font-style: italic;
}

</style>