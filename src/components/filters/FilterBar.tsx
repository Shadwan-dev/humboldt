'use client'; // ✅ Añadir esta línea al principio

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Search, X } from "lucide-react";
import { useFiltersStore } from "@/store/filtersStore";

export function FilterBar() {
  const { type, status, searchQuery, setType, setStatus, setSearchQuery, reset } = useFiltersStore();

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar especies..."
          className="pl-10 pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Tipo: {type === 'all' ? 'Todos' : type}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Categoría</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setType('all')}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setType('fauna')}>
                Fauna
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setType('flora')}>
                Flora
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Estado: {status === 'all' ? 'Todos' : status}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Estatus</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setStatus('all')}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus('endémica')}>
                Endémica
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus('migratoria')}>
                Migratoria
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus('nativa')}>
                Nativa
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {(type !== 'all' || status !== 'all' || searchQuery) && (
          <Button variant="ghost" onClick={reset} className="gap-2">
            <X className="h-4 w-4" />
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
}