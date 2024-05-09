"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from 'next/image'


import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
const supabase = createClientComponentClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

//définition de toutes les variables qu'on aura besoin pour récuperer leur valeur
const formSchema = z.object({
  username: z.string(),
  age: z.number(),
  gender: z.string().nullable(),
  interests: z.array(z.string()),
  bio: z.string(),
})

export function ProfileForm() {
  const form = useForm()

  //fonction d'ajout dans la base de données supabase
  async function onSubmit(values) {
    const { data, error } = await supabase.from('Register').insert([
      { pseudo: values.pseudo, age: values.age, gender: values.gender, interets: values.interets, bio: values.bio  }
    ]);
    alert('Merci d\'avoir rempli le questionnaire !')
    window.location.reload()
  }

  return (
    <div>
    <Image
      src="/register.png"
      width={500}
      height={100}
      alt="Picture of the author"
    /> <br></br>
    <Form {...form}>
      <form {...form} className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="pseudo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pseudo</FormLabel>
              <FormDescription>Ceci sera votre identié sur notre site.</FormDescription>
              <FormControl>
                <Input placeholder="Pseudo" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Âge</FormLabel>
              <FormDescription>Âge que vous avez à ce jour.</FormDescription>
              <FormControl>
                <Input type="number" placeholder="Âge" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Genre</FormLabel>
            <FormDescription>Veuillez sélectionner votre genre.</FormDescription>
            <FormControl>
            <RadioGroup {...field}>
              <RadioGroupItem value="Homme"/>
              Homme
              <RadioGroupItem value="Femme"/>
              Femme
              <RadioGroupItem value="Autre"/>
              Autre
            </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
          control={form.control}
          name="interets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intérêts</FormLabel>
              <FormDescription>Veuillez sélectionner un ou plusieurs intérêts.</FormDescription>
              <FormControl>
                <select multiple {...field}>
                  <option value="musculation">Musculation</option>
                  <option value="musique">Musique</option>
                  <option value="lecture">Lecture</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biographie</FormLabel>
              <FormDescription>Décrivez vous en quelques mots.</FormDescription>
              <FormControl>
                <div>
                  <textarea placeholder="Écrivez votre biographie ici..." {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Soumettre</Button>
      </form>
    </Form>
    </div>
  )
}

export default ProfileForm;
